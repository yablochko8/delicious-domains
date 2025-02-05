import { useState } from "react";
import "./App.css";
import { sendInputsAndReturnDomains } from "./serverCalls";
import { NavBar } from "./components/NavBar";
import { ExpandyInput } from "./components/ExpandyInput";
import { OptionDropdown } from "./components/OptionDropdown";

const themes = [
  "🌿 plants, nature, growth",
  "🐾 animals, pets, wildlife",
  "🍽️ food, cooking, ingredients",
  "⚒️ artisanal work, metalwork, forging",
  "☁️ gods, superheroes, heaven",
  "🔮 magic, witchcraft, spells",
  "🌌 space, galaxies, universe",
  "⏳ history, time, past",
  "💼 office, work, business",
  "🏡 home, family, real estate",
  "🏛️ government, politics, bureaucracy",
  "📚 education, learning, knowledge",
  "🏥 health, medicine, hospitals",
  "🛍️ shopping, retail, commerce",
  "🎨 creativity, art, design",
  "🌍 environment, sustainability, ecology",
  "🎉 celebration, events, parties",
]


function App() {
  const [input1Purpose, setInput1Purpose] = useState("");
  const [input2Vibe, setInput2Vibe] = useState("");
  const [input3Theme, setInput3Theme] = useState<typeof themes[number] | null>(null);
  const [domainOptions, setDomainOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const domainList = await sendInputsAndReturnDomains({
      purpose: input1Purpose,
      vibe: input2Vibe,
      theme: input3Theme,
    });
    setDomainOptions(domainList);
    setIsLoading(false);
  };


  return (
    <div className="flex flex-col w-full space-y-4">
      <NavBar />
      <div>
        <h2 className="text-center text-pink-600">give your next project a name that sizzles</h2>
      </div>
      <div>
        <h3>what are you building?</h3>
      </div>
      <div>
        <ExpandyInput
          value={input1Purpose}
          onChange={(e) => {
            setInput1Purpose(e.target.value);
          }}
          placeholder='e.g. "linkedin for cattle farms"'
        />
      </div>
      <div>
        <h3>what kind of vibe does your app have?</h3>
      </div>
      <div>
        <ExpandyInput
          value={input2Vibe}
          onChange={(e) => {
            setInput2Vibe(e.target.value);
          }}
          placeholder='e.g. "slick, sophisticated, fresh"'
        />
      </div>
      <div>
        <h3>want to use a theme or metaphor? (optional)</h3>
      </div>
      <div>
        <OptionDropdown
          value={input3Theme || ""}
          onChange={(e) => {
            setInput3Theme(e.target.value || null);
          }}
          options={themes}
        />
      </div>
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
          <div className="flex flex-col w-1/2 text-center justify-start p-4">
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
