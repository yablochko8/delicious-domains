import { useSearchStateStore } from "../stores/searchStateStore";
import {
  AddDomainsButton,
  ClearAllButtonRevised,
  EditInputsButtonRevised,
  ExportSavedButton,
} from "./Buttons";

/**
 * Floating Action Bar is sticky and about 40-60px above the bottom of the view port.
 */
export const FloatingActionBar = () => {
  const { liked } = useSearchStateStore();

  // On mobile we only have space for 2 action buttons, so we have these rules
  const showStartAgain = liked.length === 0;
  const showGenerate = liked.length > 0 && liked.length <= 4;
  const showExport = liked.length > 4;
  // Always show the EditInputs button!

  return (
    <div className="fixed bottom-0 left-0 right-0 py-6 pointer-events-none">
      <div className="flex flex-row justify-center items-center pointer-events-none">
        <div className="flex justify-center items-center bg-neutral p-3 rounded-2xl pointer-events-auto">
          <div className="hidden md:flex gap-3">
            <ClearAllButtonRevised />
            <EditInputsButtonRevised />
            <AddDomainsButton isPrimary={false} />
            {showExport && <ExportSavedButton />}
          </div>
          <div className="flex md:hidden gap-3">
            {showStartAgain && <ClearAllButtonRevised />}
            <EditInputsButtonRevised />
            {showGenerate && <AddDomainsButton isPrimary={false} />}
            {showExport && <ExportSavedButton />}
          </div>
        </div>
      </div>
    </div>
  );
};
