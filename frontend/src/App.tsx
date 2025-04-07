import { useEffect, useState } from "react";
import "./App.css";
import { checkHeartbeat, sendInputsAndReturnDomains } from "./serverCalls";
import { ExpandyInput } from "./components/ExpandyInput";
import { OptionDropdown } from "./components/OptionDropdown";
import { WhatIsThis } from "./components/WhatIsThis";
import { VibeButton } from "./components/Buttons";
import { DomainAssessment } from "shared/types";
import { DomainList } from "./components/DomainList";
import { DomainCard } from "./components/DomainCard";
import {
  exampleExpensive,
  exampleImpossible,
  exampleUnavailable,
  exampleValid,
} from "./devtools/sampleResults";

const models = [
  "gpt-4o-mini",
  "o1-mini",
  "deepseek-chat",
  // "deepseek-reasoner",
];

const STARTING_VIBES = [
  "fun",
  "serious",
  "casual",
  "professional",
  "creative",
  "unique",
  "trendy",
];

function App() {
  // User inputs
  const [inputPurpose, setInputPurpose] = useState("");
  const [inputVibe, setInputVibe] = useState("");
  const [inputShortlist, setInputShortlist] = useState("");
  const [selectedModel, setSelectedModel] = useState<(typeof models)[number]>(
    models[0]
  );
  const [seriousDomainsOnly, setSeriousDomainsOnly] = useState(false);

  // Suggestion inputs
  const [suggestedVibes, setSuggestedVibes] =
    useState<string[]>(STARTING_VIBES);

  // Request state and output
  const [domainOptions, setDomainOptions] = useState<DomainAssessment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const appendVibe = (vibe: string) => {
    setSuggestedVibes(
      suggestedVibes.filter((suggestedVibe) => suggestedVibe !== vibe)
    );

    if (inputVibe.length > 0) {
      setInputVibe(inputVibe + ", " + vibe);
    } else {
      setInputVibe(vibe);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const newDomainOptions = await sendInputsAndReturnDomains({
      purpose: inputPurpose,
      vibe: inputVibe,
      shortlist: inputShortlist,
      model: selectedModel,
      preferredTlds: seriousDomainsOnly ? ["com", "ai", "io"] : undefined,
    });
    setDomainOptions(newDomainOptions);
    setIsLoading(false);
  };

  // Wake the server when the page loads (because this is on Free plan on Render)
  useEffect(() => {
    const wakeTheServer = async () => {
      await checkHeartbeat();
    };
    wakeTheServer();
  }, []);

  return (
    <div className="flex flex-col w-full space-y-4 p-4">
      <WhatIsThis />

      <ExpandyInput
        question="what are you building? (for best results paste in a blob of text here)"
        value={inputPurpose}
        onChange={(e) => {
          setInputPurpose(e.target.value);
        }}
        placeholder='e.g. "linkedin for cattle farms"'
      />

      <ExpandyInput
        question="what kind of *vibe* do you want?"
        value={inputVibe}
        onChange={(e) => {
          setInputVibe(e.target.value);
        }}
        placeholder='e.g. "slick, sophisticated, fresh"'
      />

      <div className="flex flex-row gap-2">
        {suggestedVibes.map((vibe) => (
          <VibeButton vibe={vibe} onClick={appendVibe} key={vibe} />
        ))}
      </div>

      <ExpandyInput
        question="shortlist/longlist: paste in any ideas you've had so far (optional)"
        value={inputShortlist}
        onChange={(e) => {
          setInputShortlist(e.target.value);
        }}
        placeholder='e.g. "farm.com", "cows.com", "cows.farm"'
      />

      <div className="flex flex-row w-full justify-start items-center">
        <input
          type="checkbox"
          className="checkbox checkbox-success"
          checked={seriousDomainsOnly}
          onChange={() => setSeriousDomainsOnly(!seriousDomainsOnly)}
        />
        <label className="label cursor-pointer flex items-center">
          serious domains only (.com / .ai / .io)
        </label>
      </div>

      <OptionDropdown
        question="AI model"
        value={selectedModel}
        onChange={(e) => {
          setSelectedModel(e.target.value);
        }}
        options={models}
      />

      <div>
        <div className="flex flex-row w-full justify-center">
          <button className="btn btn-primary" onClick={() => handleSubmit()}>
            see domain ideas
          </button>
        </div>
        <div className="flex flex-row w-full min-h-screen">
          <div className="flex flex-col text-center justify-start p-4 w-full">
            {domainOptions.length > 0 && (
              <>
                <div>
                  10 domain names generated, here are the {domainOptions.length}{" "}
                  that are available to register:
                </div>
                <DomainList domainOptions={domainOptions} />
              </>
            )}
            <DomainCard {...exampleValid} />
            <DomainCard {...exampleExpensive} />
            <DomainCard {...exampleUnavailable} />
            <DomainCard {...exampleImpossible} />

            {isLoading && (
              <span className="loading loading-spinner loading-lg"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
