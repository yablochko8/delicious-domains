import { useSearchStateStore } from "../stores/searchStateStore";
import {
  ClearAllButtonRevised,
  EditInputsButtonRevised,
  ExportSavedButton,
} from "./Buttons";

/**
 * Floating Action Bar is sticky and about 40-60px above the bottom of the view port.
 */
export const FloatingActionBar = () => {
  const { liked } = useSearchStateStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 py-6">
      <div className="flex flex-row justify-center items-center">
        <div className="flex justify-center items-center bg-neutral p-3 gap-3 rounded-2xl">
          <ClearAllButtonRevised />
          <EditInputsButtonRevised />
          {liked.length > 4 && <ExportSavedButton />}
        </div>
      </div>
    </div>
  );
};
