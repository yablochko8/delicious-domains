import { useState } from "react";
import "./App.css";
import { sendInputsAndReturnDomains } from "./serverCalls";
import { NavBar } from "./components/NavBar";

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
    <>
      <div className="flex flex-row w-full justify-center">
        <NavBar />
      </div>
      <h2 className="text-center p-4">give your next project a name that sizzles</h2>
      <div className="flex flex-row w-full min-h-screen">
        <div className="flex flex-col w-1/2 space-y-4">
          <div>
            <h3>what are you building?</h3>
          </div>
          <div>
            <textarea
              className="textarea textarea-primary w-full max-w-500"
              placeholder='e.g. "linkedin for cattle farms"'
              value={input1Purpose}
              onChange={(e) => {
                setInput1Purpose(e.target.value);
              }}
              rows={3}
            />
          </div>
          <div>
            <h3>what kind of vibe does your app have?</h3>
          </div>
          <div>
            <textarea
              className="textarea textarea-secondary w-full max-w-500"
              placeholder='e.g. "slick, sophisticated, fresh"'
              value={input2Vibe}
              onChange={(e) => {
                setInput2Vibe(e.target.value);
              }}
              rows={3}
            />
          </div>
          <div>
            <h3>want to use a theme or metaphor? (optional)</h3>
          </div>
          <div>
            <select
              className="select select-accent w-full max-w-500"
              value={input3Theme || ""}
              onChange={(e) => {
                setInput3Theme(e.target.value || null);
              }}
            >
              <option value="" disabled>select</option>
              {themes.map((theme) => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col w-1/2 text-center justify-start p-4">
          {domainOptions.length > 0 &&
            domainOptions.map((value, index) => {
              return <div key={index}>{value}</div>;
            })}
          {domainOptions.length === 0 && !isLoading &&
            <button
              className="btn btn-primary"
              onClick={() => handleSubmit()}
            >
              see domain ideas
            </button>}
          {isLoading && <span className="loading loading-spinner loading-lg"></span>}

        </div>
      </div>
    </>
  );
}

export default App;
