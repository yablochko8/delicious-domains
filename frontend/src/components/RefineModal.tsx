import { useState } from "react";
import { InputForm } from "./InputForm";
import { useInputStateStore } from "../stores/inputStateStore";
import { useDisplayStateStore } from "../stores/displayStateStore";
import { useSearchStateStore } from "../stores/searchStateStore";
import { getDomainAssessment, getLongList } from "../serverCalls";
import { SELECTED_MODEL } from "./ActionButtons";
import { AddDomainsButton } from "./Buttons";

export const RefineModal = () => {

    const [isLoading, setIsLoading] = useState(false);

    const { longlist, liked, rejected, addToLonglist, addAssessment, addFailure } = useSearchStateStore();

    const { purpose, vibe, seriousDomainsOnly } = useInputStateStore();

    const { setIsRefining } = useDisplayStateStore();

    const isDisabled = !purpose || !vibe;

    const handleSubmit = async () => {

        setIsLoading(true);
        setIsRefining(false);
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
        <dialog
            id={`refine-modal`}
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box">
                <InputForm />
                <div className="modal-action justify-center">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <AddDomainsButton onClick={handleSubmit} isLoading={isLoading} isDisabled={isDisabled} />
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Add</button>
            </form>
        </dialog>
    );
};
