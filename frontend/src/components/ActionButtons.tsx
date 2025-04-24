import { useState } from "react";
import { AddDomainsButton, ClearAllButton, ExportSavedButton, RefineInputsButton } from "./Buttons";
import { useSearchStateStore } from "../stores/searchStateStore";
import { getDomainAssessment, getLongList } from "../serverCalls";
import { useInputStateStore } from "../stores/inputStateStore";
import { useDisplayStateStore } from "../stores/displayStateStore";
import { closeModal } from "../utils/openModal";
import { trackEventSafe } from "../utils/plausible";


export const SELECTED_MODEL = "gpt-4.1-mini"


/**Returns a sequence of Action Buttons, for the topnav (on desktop) or for end of list (on mobile) */
export const ActionButtons = () => {

    const [isLoading, setIsLoading] = useState(false);

    const { longlist, liked, rejected, assessments, addToLonglist, addAssessment, addFailure } = useSearchStateStore();

    const { purpose, vibe, seriousDomainsOnly } = useInputStateStore();

    const { setIsRefining } = useDisplayStateStore();

    const hasResults = assessments.completed.length > 0;

    const isDisabled = !purpose || !vibe;

    const handleSubmit = async () => {
        setIsLoading(true);
        setIsRefining(false);
        closeModal("refine-modal");
        trackEventSafe("ClickGenerate");
        try {
            const feedback =
                longlist.length > 0
                    ? {
                        viewed: longlist,
                        liked: liked,
                        rejected: rejected,
                    }
                    : undefined;
            const fetchedLonglist = await getLongList({
                purpose: purpose,
                vibe: vibe,
                shortlist: null,
                model: SELECTED_MODEL,
                preferredTlds: seriousDomainsOnly ? ["com", "ai", "io"] : undefined,
                feedback,
            });
            addToLonglist(fetchedLonglist);
            await Promise.all(
                fetchedLonglist.map(async (domain, index) => {
                    try {
                        await new Promise((resolve) => setTimeout(resolve, index * 200));
                        const assessment = await getDomainAssessment(domain);
                        console.log("Adding Assessment:", assessment);
                        addAssessment(assessment);
                    } catch (error) {
                        console.error(`Failed to assess domain ${domain}:`, error);
                        addFailure(
                            domain,
                            error instanceof Error ? error.message : String(error)
                        );
                    }
                })
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {hasResults && (
                <>
                    <ClearAllButton />
                    <RefineInputsButton />
                </>
            )}
            {liked.length > 4 && (
                <ExportSavedButton />
            )}
            <AddDomainsButton onClick={handleSubmit} isLoading={isLoading} isDisabled={isDisabled} />
        </>
    );
};