import { ScoreIcons } from "../assets/ScoreIcons";
import { explanations } from "../assets/Explanations";

/** This is not currently used. */
export const Legend = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      {Object.entries(ScoreIcons).map(([key, icon]) => (
        <div key={key} className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
          <div className="text-sm">
            {explanations[key as keyof typeof explanations]}
          </div>
        </div>
      ))}
    </div>
  );
};
