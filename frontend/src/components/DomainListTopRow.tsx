import { scoreIds } from "../assets/scoreExplanations";

export const DomainListTopRow = () => {
  const textStyling =
    "justify-center text-xs md:text-base font-bold text-slate-400";
  return (
    <>
      <div
        className={`hidden md:block md:grid grid-cols-12 p-1 ${textStyling}`}
      >
        <div className="col-span-3"></div>
        <div className="col-span-6">
          <div className="grid grid-cols-6 h-full gap-2 px-2">
            {scoreIds.map((id) => (
              <div className="col-span-1">{id}</div>
            ))}
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};
