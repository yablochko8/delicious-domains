import { DomainAssessment } from "shared/types";
import { scoreExplanationDict, ScoreId, scoreIds } from "../assets/scoreExplanations";
import { getTotalScore } from "../utils/getTotalScore";
import { useSearchStateStore } from "../stores/searchStateStore";
import { ActionIcons } from "../assets/Icons";
import { trackEventSafe } from "../utils/plausible";
import { NETIM_PARTNER_ID } from "../config";

const RejectButton = ({ domain, isRejected, showText = false }: { domain: string, isRejected: boolean, showText?: boolean }) => {
  const { rejectDomain, unrejectDomain } = useSearchStateStore();
  const handleClick = () =>
    isRejected ? unrejectDomain(domain) : rejectDomain(domain);

  const actionText = `${isRejected ? "Add back" : "Reject"}`;
  const hoverText = `${actionText} ${domain}`;

  const colorStyling = (() => {
    switch (true) {
      case showText:
        return "btn-soft btn-error border-error";
      default:
        return "reject-button border-none";
    }
  })();

  const shapeStyling = showText ? "btn-lg" : "btn-xs btn-circle";

  return (
    <button className={`btn ${shapeStyling} ${colorStyling}`} onClick={handleClick} title={hoverText}>
      {isRejected ? (
        ActionIcons.unreject
      ) : (
        ActionIcons.reject
      )}
      {showText && <div className="text-sm">{actionText}</div>}
    </button>
  );
};

export const LikeButton = ({ domain, isLiked, showText = false }: { domain: string, isLiked: boolean, showText?: boolean }) => {
  const { likeDomain, unlikeDomain } = useSearchStateStore();
  const handleClick = () =>
    isLiked ? unlikeDomain(domain) : likeDomain(domain);

  const actionText = `${isLiked ? "Unlike" : "Like"}`;

  const hoverText = `${actionText} ${domain}`;

  const styling = (() => {
    switch (true) {
      case showText:
        return "btn-soft btn-success border-success";
      default:
        return "like-button border-none circle-button";
    }
  })();

  const shapeStyling = showText ? "btn btn-lg" : "";

  return (
    <button
      className={`${shapeStyling} ${styling}`}
      onClick={handleClick}
      title={hoverText}
    >
      {isLiked ?
        ActionIcons.unlike
        :
        ActionIcons.like
      }
      {showText && <div className="text-sm">{actionText}</div>}
    </button>
  );
};



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

const RegisterButton = ({ domain, showText = false }: { domain: string, showText?: boolean }) => {

  const handleClick = () => {
    trackEventSafe("ClickRegister");
  };
  const shapeStyling = showText ? "btn-lg" : "btn-square";
  const hoverText = `Register ${domain}`
  const targetUrl = `https://www.netim.com/en/domain-name/search?partnerid=${NETIM_PARTNER_ID}&domain=${domain}`;


  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-primary ${shapeStyling}`}
      onClick={handleClick}
      title={hoverText}
    >
      {ActionIcons.register}
      {showText && <div className="text-sm">Register</div>}
    </a>
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
            <div className="max-h-[60vh] gap-1">
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
            <RejectButton domain={assessment.domain} isRejected={false} showText={true} />
            <LikeButton domain={assessment.domain} isLiked={false} showText={true} />
            <RegisterButton domain={assessment.domain} showText={true} />
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
