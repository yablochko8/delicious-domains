import { ClearAllButton, ExportSavedButton, EditInputsButton } from "./Buttons";
import { useSearchStateStore } from "../stores/searchStateStore";

/**Returns a sequence of Action Buttons, for the topnav (on desktop) or for end of list (on mobile) */
export const ActionButtons = () => {
    const { liked, assessments } = useSearchStateStore();
    const hasResults = assessments.completed.length > 0;
    return (
        <>
            {hasResults && (
                <>
                    <ClearAllButton />
                    <EditInputsButton />
                </>
            )}
            {liked.length > 4 && (
                <ExportSavedButton />
            )}
        </>
    );
};