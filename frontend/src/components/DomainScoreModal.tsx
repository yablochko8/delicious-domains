import { DomainAssessment } from "shared/types";
import { scoreExplanationDict, ScoreId, scoreIds } from "../assets/scoreExplanations";
import { LikeButton, RejectButton } from "./DomainCard";
import { getTotalScore } from "../utils/getTotalScore";


const DomainScoreModalEntry = ({
  scoreId,
  score,
}: {
  scoreId: ScoreId;
  score: number;
  domain: string;
}) => {

  const progressStyle = (() => {
    switch (true) {
      case score < 6:
        return "progress-error";
      case score < 8:
        return "progress-warning";
      default:
        return "progress-success";
    }
  })();

  return (
    <div key={scoreId}>
      <h3 className="flex flex-row items-center justify-between">
        <span>
          {scoreExplanationDict[scoreId].name}
        </span>
        <span>
          {score}/10
        </span>
      </h3>
      <div className="flex flex-row py-1">
        <progress className={`progress ${progressStyle} w-full`} value={score} max="10"></progress>
      </div>
      <div className="flex flex-row text-description">
        {scoreExplanationDict[scoreId].shortDescription}
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
        <div className="flex flex-col gap-2 text-justify px-4">
          <h2 className="font-bold w-full text-center">{assessment.domain}</h2>
          <p className="text-subheader text-center">
            Overall Score: {assessment.scores ? getTotalScore(assessment, true) : 0}%
          </p>
          <div className="max-h-[60vh] pb-16">
            <div className="overflow-y-auto max-h-[60vh] gap-1">
              {assessment.scores &&
                [...scoreIds]
                  .sort((a: ScoreId, b: ScoreId) => (assessment.scores?.[b] ?? 0) - (assessment.scores?.[a] ?? 0))
                  .map((scoreId: ScoreId) => (
                    <DomainScoreModalEntry scoreId={scoreId} score={assessment.scores ? assessment.scores[scoreId] : 0} domain={assessment.domain} />
                  ))
              }
            </div>
          </div>
        </div>
        <div className="modal-action justify-center gap-2">
          <form method="dialog" className="fixed bottom-0 flex gap-4 bg-base-100 w-full justify-center p-4">
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
