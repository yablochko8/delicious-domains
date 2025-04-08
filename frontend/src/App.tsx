import { useEffect, useState } from "react";
import "./App.css";
import { checkLimits, getDomainAssessment, getLongList } from "./serverCalls";
import { ExpandyInput } from "./components/ExpandyInput";
import { OptionDropdown } from "./components/OptionDropdown";
import { WhatIsThis } from "./components/WhatIsThis";
import { AddDomainsButton, VibeButton } from "./components/Buttons";
import { DomainList } from "./components/DomainList";
import { DomainCard } from "./components/DomainCard";
import {
  exampleExpensive,
  exampleImpossible,
  exampleUnavailable,
  exampleValid,
} from "./devtools/sampleResults";
import { useSearchStateStore } from "./stores/searchStateStore";

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
  const [showDevtools, setShowDevtools] = useState(false);

  // Suggestion inputs
  const [suggestedVibes, setSuggestedVibes] =
    useState<string[]>(STARTING_VIBES);

  // Request state and output

  const {
    longlist,
    liked,
    rejected,
    assessments: assessedDomains,
    addToLonglist,
    addAssessment,
    addFailure,
  } = useSearchStateStore();

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
    const feedback =
      longlist.length > 0
        ? {
            viewed: longlist,
            liked: liked,
            rejected: rejected,
          }
        : undefined;
    const fetchedLonglist = await getLongList({
      purpose: inputPurpose,
      vibe: inputVibe,
      shortlist: inputShortlist,
      model: selectedModel,
      preferredTlds: seriousDomainsOnly ? ["com", "ai", "io"] : undefined,
      feedback,
    });
    addToLonglist(fetchedLonglist);
    await Promise.all(
      fetchedLonglist.map(async (domain, index) => {
        try {
          await new Promise((resolve) => setTimeout(resolve, index * 200));
          const assessment = await getDomainAssessment(domain);
          console.log("Adding Assessment:", assessment);
          addAssessment(assessment);
        } catch (error) {
          console.error(`Failed to assess domain ${domain}:`, error);
          addFailure(
            domain,
            error instanceof Error ? error.message : String(error)
          );
        }
      })
    );
  };

  // Wake the server when the page loads (because this is on Free plan on Render)
  useEffect(() => {
    const wakeTheServer = async () => {
      const reportedMaxDomains = await checkLimits();
      console.log("Max domains:", reportedMaxDomains);
      // This will prob be useful on the frontend eventually
    };
    wakeTheServer();
  }, []);

  return (
    <>
      <div className="absolute top-2 right-2">
        <label className="label cursor-pointer flex items-center gap-2">
          <span className="text-sm">dev mode</span>
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={showDevtools}
            onChange={() => setShowDevtools(!showDevtools)}
          />
        </label>
      </div>
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

        <div className="flex flex-row gap-2 flex-wrap">
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
        {showDevtools && (
          <>
            <OptionDropdown
              question="AI model"
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
              }}
              options={models}
            />
          </>
        )}

        <div>
          <div className="flex flex-row w-full justify-center">
            <AddDomainsButton onClick={handleSubmit} />
          </div>
          <div className="flex flex-row w-full min-h-screen">
            <div className="flex flex-col text-center justify-start p-4 w-full">
              {/* HEADLINE */}
              {assessedDomains.completed.length > 0 && (
                <>
                  <div>
                    {longlist.length} domain names considered. Names with
                    hallucinated TLDs are omitted.
                  </div>
                </>
              )}

              {/* RESULTS */}
              {assessedDomains.completed.length > 0 && (
                <>
                  <DomainList domainOptions={assessedDomains.completed} />
                </>
              )}

              {/* IN PROGRESS */}

              {assessedDomains.inProgress.length > 0 && (
                <>
                  <div>
                    Gathering scores for {assessedDomains.inProgress.length}{" "}
                    domains...
                  </div>
                  {assessedDomains.inProgress.map((domain) => (
                    <div key={domain}>{domain}</div>
                  ))}
                </>
              )}

              {/* FAILED - TODO ADD IN LATER */}

              {/* DEV - TODO REMOVE LATER */}

              {showDevtools && (
                <>
                  <DomainCard {...exampleValid} />
                  <DomainCard {...exampleExpensive} />
                  <DomainCard {...exampleUnavailable} />
                  <DomainCard {...exampleImpossible} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
