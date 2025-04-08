export const DomainListTopRow = () => {
  const textStyling =
    "justify-center text-xs md:text-base font-bold text-slate-400";
  return (
    <>
      <div
        className={`hidden md:block md:grid grid-cols-12 p-1 ${textStyling}`}
      >
        <div className="col-span-3"></div>
        <div className="col-span-7">
          <div className="grid grid-cols-7 h-full gap-2 px-2">
            <div className="col-span-1">EVOC</div>
            <div className="col-span-1">BREV</div>
            <div className="col-span-1">GREP</div>
            <div className="col-span-1">GOOG</div>
            <div className="col-span-1">PRON</div>
            <div className="col-span-1">SPEL</div>
            <div className="col-span-1">VERB</div>
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};
