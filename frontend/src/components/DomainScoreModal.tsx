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
      case score < 5:
        return "text-red-600";
      case score < 7:
        return "text-yellow-600";
      default:
        return "text-green-600";
    }
  })();
  return (
    <div key={scoreId} className="bg-base-200 rounded-md p-2">
      <div className="flex flex-row gap-1 text-xl items-center rounded-md">
        <p className={`text-lg font-bold ${textColor}`}>{score}/10 {scoreExplanationDict[scoreId].name}</p>
        <div className="flex flex-grow"></div>
      </div>
      <div className="flex flex-row items-center pt-2">
        <p className="text-sm text-left">Criteria: {scoreExplanationDict[scoreId].shortDescription}</p>
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
        <h2 className="font-bold">{assessment.domain}</h2>
        <p className="py-4">Scores assessed by AI.</p>
        <div className="flex flex-col gap-4 text-justify">
          {assessment.scores &&

            scoreIds.map(scoreId => (
              <DomainScoreModalEntry scoreId={scoreId} score={assessment.scores ? assessment.scores[scoreId] : 0} domain={assessment.domain} />
            ))
          }
        </div>
        <div className="modal-action justify-center gap-2">
          <form method="dialog">
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
