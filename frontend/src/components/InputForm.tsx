import { useInputStateStore } from "../stores/inputStateStore";
import { useMemo, useState } from "react";
import { InputMultiCheckbox } from "./InputMultiCheckbox";
import { ActionIcons } from "../assets/Icons";
import { useDomainGeneration } from "../hooks/useDomainGeneration";
import { EnterButton } from "./Buttons";

const EXAMPLE_PURPOSES = [
  "linkedin for cats",
  "instagram for giraffes",
  "uber for lawnmowers",
  "airbnb for camping sites",
  "spotify for podcasts",
];

const VIBE_OPTIONS: string[] = [
  "bold",
  "casual",
  "clean",
  "cool",
  "elegant",
  "energetic",
  "friendly",
  "funny",
  "hip",
  "luxurious",
  "minimalist",
  "modern",
  "playful",
  "professional",
  "quirky",
  "serious",
  "simple",
  "slick",
  "trendy",
  "trustworthy",
  "youthful",
];

const TLD_OPTIONS = [
  ".com",
  ".ai",
  ".io",
  ".app",
  ".dev",
  ".xyz",
  ".net",
  ".org",
  ".agency",
  ".art",
  ".biz",
  ".blog",
  ".center",
  ".click",
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
  ".live",
  ".me",
  ".media",
  ".network",
  ".news",
  ".online",
  ".pro",
  ".shop",
  ".site",
  ".solutions",
  ".space",
  ".store",
  ".studio",
  ".tech",
  ".team",
  ".today",
  ".works",
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
        <p className="text-form-heading">{question}</p>
        {subhead && <p className="text-form-subheading">{subhead}</p>}
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

export const InputForm = () => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
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

  // useMemo to avoid re-rendering with a new random purpose on every interaction
  const randomPurpose = useMemo(
    () => EXAMPLE_PURPOSES[Math.floor(Math.random() * EXAMPLE_PURPOSES.length)],
    []
  );

  return (
    <div className="flex flex-col gap-4 py-4 pt-20">
      <PurposeInput
        question="What are you building?"
        subhead="The more detail the better! "
        value={purpose}
        onChange={(e) => {
          setPurpose(e.target.value);
        }}
        placeholder={`E.g. "${randomPurpose}"`}
      />

      <div className="flex flex-row w-full justify-start items-center gap-2">
        <button
          className={`btn btn-sm font-normal rounded-lg text-sm ${
            showAdvancedOptions ? "btn-neutral" : "btn-outline"
          }`}
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        >
          {ActionIcons.generate}Advanced Options
        </button>
      </div>
      {showAdvancedOptions && (
        <>
          <div>
            <h3>What's your vibe?</h3>
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
                  className="btn btn-sm btn-ghost"
                  onClick={clearVibes}
                >
                  Clear vibes
                </button>
              )}
            </div>
          </div>
          <div>
            <h3>Preferred domain extensions?</h3>
            <p className="text-sm text-base-content/60">
              Tick nothing to stick to a longer list of ~350 options
            </p>
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
                className="btn btn-sm btn-ghost"
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
