import { DomainAssessment } from "shared/types";
import { scoreExplanationDict, ScoreId } from "../assets/scoreExplanations";
import { ScoreIcons } from "../assets/Icons";
import { useSearchStateStore } from "../stores/searchStateStore";

const DomainScoreModalTile = ({
  scoreId,
  actualScore,
  thisTileScore,
  domain,
}: {
  scoreId: ScoreId;
  actualScore: number;
  thisTileScore: number;
  domain: string;
}) => {
  const { nudgeScore } = useSearchStateStore();

  // Check if the stored score for this scoreId for this domain matches the prop score
  const isActive = actualScore === thisTileScore;

  const handleClick = () => {
    console.log("set the score for", scoreId, actualScore, thisTileScore);
    nudgeScore(domain, scoreId);
  };
  const logicKey = `${thisTileScore}-${isActive ? "true" : "false"}`;
  const backgroundColor = (() => {
    switch (logicKey) {
      case "1-true":
        return "bg-red-200 text-red-600";
      case "2-true":
        return "bg-yellow-200 text-yellow-600";
      case "3-true":
        return "bg-green-200 text-green-600";
      default:
        return "bg-gray-200 text-gray-400";
    }
  })();



  const ScoreIcon = ScoreIcons[scoreId as keyof typeof ScoreIcons];

  return (
    <div
      className={`p-2 rounded-md cursor-pointer ${backgroundColor}`}
      title={scoreExplanationDict[scoreId].description}
      onClick={handleClick}
    >
      {ScoreIcon}
    </div>
  );
};


const DomainScoreModalEntry = ({
  scoreId,
  score,
  domain,
}: {
  scoreId: ScoreId;
  score: number;
  domain: string;
}) => {

  const textColor = (() => {
    switch (score) {
      case 1:
        return "text-red-600";
      case 2:
        return "text-yellow-600";
      case 3:
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  })();
  return (
    <div key={scoreId}>
      <div className="flex flex-row gap-1 text-2xl items-center bg-base-200 rounded-md p-2">
        <p className={`text-lg font-bold ${textColor}`}>{score}/3 {scoreExplanationDict[scoreId].name}</p>
        <div className="flex flex-grow"></div>
        <DomainScoreModalTile scoreId={scoreId} actualScore={score} thisTileScore={1} domain={domain} />
        <DomainScoreModalTile scoreId={scoreId} actualScore={score} thisTileScore={2} domain={domain} />
        <DomainScoreModalTile scoreId={scoreId} actualScore={score} thisTileScore={3} domain={domain} />
      </div>
      <p className="text-sm">{scoreExplanationDict[scoreId].description}</p>
    </div>
  );
};

export const DomainScoreModal = ({
  assessment,
}: {
  assessment: DomainAssessment;
}) => {
  console.log(assessment.scores);
  return (
    <dialog
      id={`domain-score-modal-${assessment.domain}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <p className="py-4">Score Breakdown for {assessment.domain}</p>
        <div className="flex flex-col gap-4 text-justify">
          {assessment.scores &&
            Object.entries(assessment.scores).map(([key, score]) => (
              <DomainScoreModalEntry scoreId={key as ScoreId} score={score} domain={assessment.domain} />
            ))}
        </div>
        <div className="modal-action justify-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Back</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
