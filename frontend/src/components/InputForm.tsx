import { useInputStateStore } from "../stores/inputStateStore";
import { useMemo, useState } from "react";
import { InputMultiCheckbox } from "./InputMultiCheckbox";
// import { ActionIcons } from "../assets/Icons";
import { useDomainGeneration } from "../hooks/useDomainGeneration";
import { EnterButton } from "./Buttons";
import { useSearchStateStore } from "../stores/searchStateStoreV2";

const EXAMPLE_PURPOSES = [
  "linkedin for cats",
  "instagram for giraffes",
  "uber for lawnmowers",
  "airbnb for camping sites",
  "spotify for podcasts",
];

const VIBE_OPTIONS: string[] = [
  // "serious",
  // "trustworthy",
  "professional",
  "modern",
  "elegant",
  "simple",
  "bold",
  "casual",
  "trendy",
  "playful",
  "energetic",
  "quirky",
  // "clean",
  // "cool",
  // "friendly",
  // "funny",
  // "hip",
  // "luxurious",
  // "minimalist",
  // "slick",
  // "youthful",
];

const TLD_OPTIONS = [
  ".com",
  ".ai",
  ".app",
  ".dev",
  ".io",
  ".net",
  ".org",
  ".xyz",
  ".agency",
  ".art",
  ".biz",
  ".blog",
  ".center",
  // ".click",
  ".cloud",
  ".club",
  ".co",
  ".company",
  ".consulting",
  ".data",
  ".design",
  ".digital",
  ".diy",
  ".expert",
  ".fun",
  ".global",
  ".group",
  ".info",
  ".ink",
  ".life",
  // ".live",
  ".me",
  ".media",
  ".network",
  ".news",
  ".online",
  ".pro",
  ".shop",
  // ".site",
  ".solutions",
  ".space",
  ".store",
  ".studio",
  ".tech",
  ".team",
  ".today",
  // ".works",
  ".world",
];

type ExpandyInputProps = {
  question: string;
  subhead?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const PurposeInput = ({
  question,
  subhead,
  value,
  onChange,
  placeholder,
}: ExpandyInputProps) => {
  const { generateDomains } = useDomainGeneration();

  // If a user hits Enter in this input, we want to trigger generate domains
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      generateDomains();
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <p className="text-form-heading-white">{question}</p>
        {subhead && <p className="text-form-subheading-white">{subhead}</p>}
      </div>
      <div className="relative">
        <input
          type="text"
          className="input-background w-full max-w-500 text-base p-3 pr-10 border-1 border-black rounded-2xl drop-shadow focus:drop-shadow-lg"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <div className="absolute right-3 bottom-3">
          <EnterButton />
        </div>
      </div>
    </div>
  );
};

export const InputForm = ({
  whiteBackground = false,
}: {
  whiteBackground?: boolean;
}) => {
  const [showAdvancedOptions, _setShowAdvancedOptions] = useState(true);
  const {
    purpose,
    vibeArray,
    preferredTlds,
    setPurpose,
    toggleVibe,
    togglePreferredTld,
    clearVibes,
    clearPreferredTlds,
  } = useInputStateStore();

  const { domains } = useSearchStateStore();

  // If any results have already been generated, this will display over the top (dark) end of the gradient
  const hasDarkBackground = domains.length > 0 && !whiteBackground;

  // useMemo to avoid re-rendering with a new random purpose on every interaction
  const randomPurpose = useMemo(
    () => EXAMPLE_PURPOSES[Math.floor(Math.random() * EXAMPLE_PURPOSES.length)],
    []
  );

  return (
    <div className="flex flex-col gap-4 py-4 pb-20">
      <PurposeInput
        question="Describe your company or project:"
        // subhead="Use your own words. The more detail the better. This will be passed to the AI to generate name ideas."
        value={purpose}
        onChange={(e) => {
          setPurpose(e.target.value);
        }}
        placeholder={`E.g. "${randomPurpose}"`}
      />

      {/* <div className="flex flex-row w-full justify-start items-center gap-2">
        <button
          className={`pill-button 
            ${showAdvancedOptions
              ? "selector-button-selected"
              : "selector-button"
            }`}
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        >
          {ActionIcons.generate}Advanced Options
        </button>
      </div> */}
      {showAdvancedOptions && (
        <>
          <div
            className={`${hasDarkBackground
              ? "text-form-heading-white"
              : "text-form-heading-black"
              }`}
          >
            What's your vibe?
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {VIBE_OPTIONS.map((vibe) => (
                <InputMultiCheckbox
                  key={vibe}
                  tld={vibe}
                  checked={vibeArray.includes(vibe)}
                  onChange={() => toggleVibe(vibe)}
                />
              ))}
              {vibeArray.length > 0 && (
                <button
                  type="button"
                  className="pill-button tertiary-action-button"
                  onClick={clearVibes}
                >
                  Clear vibes
                </button>
              )}
            </div>
          </div>
          <div>
            <div
              className={`${hasDarkBackground
                ? "text-form-heading-white"
                : "text-form-heading-black"
                }`}
            >
              Preferred domain extensions?
            </div>
            <div
              className={`${hasDarkBackground
                ? "text-form-subheading-white"
                : "text-form-subheading-black"
                }`}
            >
              Tick nothing to stick to a longer list of ~350 options
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {TLD_OPTIONS.map((tld) => (
              <InputMultiCheckbox
                key={tld}
                tld={tld}
                checked={preferredTlds.includes(tld)}
                onChange={() => togglePreferredTld(tld)}
              />
            ))}
            {preferredTlds.length > 0 && (
              <button
                type="button"
                className="pill-button tertiary-action-button"
                onClick={clearPreferredTlds}
              >
                Clear extensions
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
