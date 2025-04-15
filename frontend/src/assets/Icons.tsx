import { ScoreId } from "./scoreExplanations";
// Try keep each icon set from the same library

// Score Icons
import { IoFlower as EvocIcon } from "react-icons/io5";
import { BsSkipForwardFill as BrevIcon } from "react-icons/bs";
import { FaSearch as FindIcon } from "react-icons/fa";
import { GiNothingToSay as PronIcon } from "react-icons/gi";
import { FaSpellCheck as SpelIcon } from "react-icons/fa";
import { GrRun as LegsIcon } from "react-icons/gr";

// Social Icons
import { FaXTwitter as TwitterIcon } from "react-icons/fa6";
import { FaGithub as GithubIcon } from "react-icons/fa";

// Action Icons
import { FaPlus as PlusIcon } from "react-icons/fa";
import { FaMinus as MinusIcon } from "react-icons/fa";
// import { MdRefresh as StartAgainIcon } from "react-icons/md";

import { HiOutlineDocument as StartAgainIcon } from "react-icons/hi2";
import { HiOutlinePencil as EditIcon } from "react-icons/hi2";
import { HiOutlineShare as ShareIcon } from "react-icons/hi2";

import { FaArrowUpRightFromSquare as ExportIcon } from "react-icons/fa6";

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

export const ActionIcons = {
  plus: <PlusIcon />,
  minus: <MinusIcon />,
  startAgain: <StartAgainIcon />,
  editInputs: <EditIcon />,
  export: <ExportIcon />,
  share: <ShareIcon />,
};
