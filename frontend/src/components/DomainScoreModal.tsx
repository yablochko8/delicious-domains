import { DomainAssessment } from "shared/types";
import { explanations } from "../assets/scoreExplanations";

export const DomainScoreModal = ({
  assessment,
}: {
  assessment: DomainAssessment;
}) => {
  return (
    <dialog
      id="DomainScoreModal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <p className="py-4">FULL SCORES</p>
        <div className="flex flex-col gap-4 text-justify">
          {assessment.scores &&
            Object.entries(assessment.scores).map(([key, score]) => (
              <div key={key}>
                <h2 className="font-bold">
                  {key.toUpperCase()} : {score}
                </h2>
                <p className="text-sm">
                  {explanations[key as keyof typeof explanations]}
                </p>
              </div>
            ))}
        </div>
        <div className="modal-action justify-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Back</button>
          </form>
        </div>
      </div>
      {/* <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form> */}
    </dialog>
  );
};
