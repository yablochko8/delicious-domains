import { useSearchStateStore } from "../stores/searchStateStoreV2";
import {
  AddDomainsButton,
  // ClearAllButton,
  CreateSurveyButton,
  EditInputsButtonRevised,
} from "./Buttons";

/**
 * Floating Action Bar is sticky and about 40-60px above the bottom of the view port.
 */
export const FloatingActionBar = () => {
  const { domains, getLiked } = useSearchStateStore();

  // On mobile we only have space for 2 action buttons, so we have these rules
  // const showStartAgain = domains.length === 0;
  const showGenerate = domains.length > 0 && domains.length <= 4;
  const showExport = getLiked().length > 1;
  // Always show the EditInputs button!

  return (
    <div className="fixed bottom-0 left-0 right-0 py-6 pointer-events-none">
      <div className="flex flex-row justify-center items-center pointer-events-none">
        <div className="flex justify-center items-center bg-neutral p-3 rounded-2xl pointer-events-auto">
          <div className="hidden md:flex gap-3">
            {/* <ClearAllButtonRevised /> */}
            <EditInputsButtonRevised />
            <AddDomainsButton isPrimary={false} />
            {showExport && <CreateSurveyButton />}
          </div>
          <div className="flex md:hidden gap-3">
            {/* {showStartAgain && <ClearAllButton />} */}
            <EditInputsButtonRevised />
            {showGenerate && <AddDomainsButton isPrimary={false} />}
            {showExport && <CreateSurveyButton />}
          </div>
        </div>
      </div>
    </div>
  );
};
