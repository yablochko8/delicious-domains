import { useEffect, useState } from "react";
import "./App.css";
import { checkHeartbeat, sendInputsAndReturnDomains } from "./serverCalls";
import { ExpandyInput } from "./components/ExpandyInput";
import { OptionDropdown } from "./components/OptionDropdown";
import { WhatIsThis } from "./components/WhatIsThis";

const models = [
  "gpt-4o-mini",
  "o1-mini",
  "deepseek-chat",
  // "deepseek-reasoner",
]

function App() {

  // User inputs
  const [inputPurpose, setInputPurpose] = useState("");
  const [inputVibe, setInputVibe] = useState("");
  const [inputShortlist, setInputShortlist] = useState("");
  const [selectedModel, setSelectedModel] = useState<typeof models[number]>(models[0]);

  // Request state and output 
  const [domainOptions, setDomainOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async () => {
    setIsLoading(true);
    const domainList = await sendInputsAndReturnDomains({
      purpose: inputPurpose,
      vibe: inputVibe,
      shortlist: inputShortlist,
      model: selectedModel,
    });
    setDomainOptions(domainList);
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

      <ExpandyInput
        question="shortlist/longlist: paste in any ideas you've had so far (optional)"
        value={inputShortlist}
        onChange={(e) => {
          setInputShortlist(e.target.value);
        }}
        placeholder='e.g. "farm.com", "cows.com", "cows.farm"'
      />

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
          <button
            className="btn btn-primary"
            onClick={() => handleSubmit()}
          >
            see domain ideas
          </button>
        </div>
        <div className="flex flex-row w-full min-h-screen">
          <div className="flex flex-col text-center justify-start p-4 w-full">
            {domainOptions.length > 0 &&
              domainOptions.map((value, index) => {
                return <div key={index}>{value}</div>;
              })}

            {isLoading && <span className="loading loading-spinner loading-lg"></span>}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
