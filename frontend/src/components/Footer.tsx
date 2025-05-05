import { WEBSITE_NAME } from "../config";
import { Socials } from "./Socials";

export const Footer = () => {
  return (
    <div className="flex flex-row justify-between h-28 mt-28">
      <div className="flex flex-col text-zinc-400  ">
        <div className="text-lg font-bold">{WEBSITE_NAME}</div>
        <div className="font-light">© 2025</div>
      </div>
      <div className="flex flex-row text-about gap-2">
        <Socials />
      </div>
    </div>
  );
};
