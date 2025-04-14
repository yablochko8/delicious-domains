import { DomainAssessment } from "shared/types";
import { scoreExplanationDict, ScoreId, scoreIds } from "../assets/scoreExplanations";
import { LikeButton, RejectButton } from "./DomainCard";



const DomainScoreModalEntry = ({
  scoreId,
  score,
}: {
  scoreId: ScoreId;
  score: number;
  domain: string;
}) => {

  const textColor = (() => {
    switch (true) {
      case score < 6:
        return "text-error-content";
      case score < 8:
        return "text-warning-content";
      default:
        return "text-success-content";
    }
  })();

  const bgColor = (() => {
    switch (true) {
      case score < 6:
        return "bg-error/20";
      case score < 8:
        return "bg-warning/20";
      default:
        return "bg-success/20";
    }
  })();

  return (
    <div key={scoreId} className={`bg-base-200 rounded-md px-4 py-2 ${bgColor}`}>
      <div className="flex flex-row gap-1 text-xl items-center rounded-md">
        <p className={`text-base font-bold ${textColor}`}>{score}/10 {scoreExplanationDict[scoreId].name}</p>
        <div className="flex flex-grow"></div>
      </div>
      <div className="flex flex-row items-center pt-2">
        <p className="text-xs text-justify text-gray-500">{scoreExplanationDict[scoreId].shortDescription}</p>
      </div>
    </div>
  );
};

export const DomainScoreModal = ({
  assessment,
}: {
  assessment: DomainAssessment;
}) => {
  return (
    <dialog
      id={`domain-score-modal-${assessment.domain}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <div className="flex flex-col gap-4 text-justify">
          <h2 className="font-bold w-full text-center">{assessment.domain}</h2>
          {assessment.scores &&
            scoreIds.map(scoreId => (
              <DomainScoreModalEntry scoreId={scoreId} score={assessment.scores ? assessment.scores[scoreId] : 0} domain={assessment.domain} />
            ))
          }
        </div>
        <div className="modal-action justify-center gap-2">
          <form method="dialog" className="flex gap-4">
            {/* if there is a button in form, it will close the modal */}
            <RejectButton domain={assessment.domain} isLiked={false} isRejected={false} showText={true} />
            <LikeButton domain={assessment.domain} isLiked={false} isRejected={false} showText={true} />
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
