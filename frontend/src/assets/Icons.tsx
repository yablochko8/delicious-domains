import { IoFlower as EvocIcon } from "react-icons/io5";
import { BsSkipForwardFill as BrevIcon } from "react-icons/bs";
import { FaSearch as FindIcon } from "react-icons/fa";
import { GiNothingToSay as PronIcon } from "react-icons/gi";
import { FaSpellCheck as SpelIcon } from "react-icons/fa";
import { GrRun as LegsIcon } from "react-icons/gr";
import { FaXTwitter as TwitterIcon } from "react-icons/fa6";
import { FaGithub as GithubIcon } from "react-icons/fa";

import { ScoreId } from "./scoreExplanations";

export const ScoreIcons: Record<ScoreId, JSX.Element> = {
  evoc: <EvocIcon />,
  brev: <BrevIcon />,
  pron: <PronIcon />,
  spel: <SpelIcon />,
  legs: <LegsIcon />,
  find: <FindIcon />,
};



export const SocialIcons = {
  twitter: <TwitterIcon />,
  github: <GithubIcon />,
};
