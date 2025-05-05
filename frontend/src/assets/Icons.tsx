import { ScoreId } from "./scoreExplanations";

// Try to keep each icon set from the same library!

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
import { FaBluesky as BlueskyIcon } from "react-icons/fa6";
import { FaEnvelope as EmailIcon } from "react-icons/fa";
import { FaHome as HomeIcon } from "react-icons/fa";
import { FaChevronRight as EnterIcon } from "react-icons/fa";

// Action Icons
import {
  MdFavoriteBorder as LikeIcon,
  MdFavorite as UnlikeIcon,
  MdClose as RejectIcon,
  MdClose as UnrejectIcon,
  MdShoppingCartCheckout as RegisterIcon,
} from "react-icons/md";
import {
  HiOutlineShare as ShareIcon,
  HiOutlineSparkles as GenerateIcon,
} from "react-icons/hi2";
import { AiOutlineExport as ExportIcon } from "react-icons/ai";
import { MdQuestionMark as AboutIcon } from "react-icons/md";

import {
  LuThumbsUp as ThumbsUpIcon,
  LuThumbsDown as ThumbsDownIcon,
} from "react-icons/lu";

// Revised Icons

import { LuRotateCcw as StartAgainIconRevised } from "react-icons/lu";
import { LuWrench as EditInputsIconRevised } from "react-icons/lu";

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
  bluesky: <BlueskyIcon />,
  email: <EmailIcon />,
  home: <HomeIcon />,
};

export const ActionIcons = {
  like: <LikeIcon className="text-2xl" />,
  unlike: <UnlikeIcon className="text-2xl" />,
  reject: <RejectIcon className="text-2xl" />,
  unreject: <UnrejectIcon className="text-2xl" />,
  register: <RegisterIcon className="text-sm" />,
  startAgain: <StartAgainIconRevised className="text-lg" />,
  editInputs: <EditInputsIconRevised className="text-lg" />,
  export: <ExportIcon className="text-lg" />,
  share: <ShareIcon />,
  generate: <GenerateIcon />,
  about: <AboutIcon />,
  enter: <EnterIcon />,
  thumbsUp: <ThumbsUpIcon className="text-sm" />,
  thumbsDown: <ThumbsDownIcon className="text-sm" />,
};
