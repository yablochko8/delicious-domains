import { useEffect, useState } from "react";
import "./App.css";
import { getAvailableTlds, sendInputsAndReturnDomains } from "./serverCalls";

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
  // const [availableTlds, setAvailableTlds] = useState<string[]>([]);
  // const [selectedTlds, setSelectedTlds] = useState<string[]>([]);
  const [domainOptions, setDomainOptions] = useState<string[]>([]);


  // const handleGetRelevantTlds = async () => {
  //   const tlds = await getRelevantTlds({
  //     purpose: input1Purpose,
  //     vibe: input2Vibe,
  //     theme: input3Theme,
  //   });
  //   setSelectedTlds(tlds);
  // };

  const handleSubmit = async () => {
    const domainList = await sendInputsAndReturnDomains({
      purpose: input1Purpose,
      vibe: input2Vibe,
      theme: input3Theme,
    });
    setDomainOptions(domainList);
  };

  // useEffect initially to fetch all available tlds and select them all
  useEffect(() => {
    const fetchTlds = async () => {
      const tlds = await getAvailableTlds();
      // setAvailableTlds(tlds);
      // setSelectedTlds(tlds);
      console.log("Tlds fetched:", tlds);
    };
    fetchTlds();

  }, []);


  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
      }}>
        <h1>Delicious Domains</h1>

      </div>
      <div>There are now over 1,000 top-level domains to choose from. So if you're building Strawberry Finance, why send users to getstrawberryfinance.com when you can delight them with strawberry.finance?</div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        minHeight: '100vh',
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <div>What are you building?</div>
          <textarea
            placeholder='e.g. "linkedin for cattle farms"'
            value={input1Purpose}
            onChange={(e) => {
              setInput1Purpose(e.target.value);
            }}
            rows={4}
            style={{ width: '100%', maxWidth: '500px' }}
          />
          <br />
          <div>What kind of vibe does your app have?</div>
          <textarea
            placeholder='e.g. "slick, sophisticated, fresh"'
            value={input2Vibe}
            onChange={(e) => {
              setInput2Vibe(e.target.value);
            }}
            rows={4}
            style={{ width: '100%', maxWidth: '500px' }}
          />
          <br />
          <div>Any theme or metaphor you're considering? (optional)</div>
          <select
            value={input3Theme || ""}
            onChange={(e) => {
              setInput3Theme(e.target.value || null);
            }}
            style={{ width: '100%', maxWidth: '500px' }}
          >
            <option value="" disabled>Select a theme (optional)</option>
            {themes.map((theme) => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>
          <br />
          {/* 
          <button onClick={handleGetRelevantTlds}>Pick Out Good TLD Options For Me</button>
          <br />
          <div>Select TLDs</div>
          <div>
            {availableTlds.length > 0 && availableTlds.map((tld) => {
              return (
                <label key={tld} style={{ display: 'block' }}>
                  <input
                    type="checkbox"
                    checked={selectedTlds.includes(tld)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTlds([...selectedTlds, tld]);
                      } else {
                        setSelectedTlds(selectedTlds.filter(t => t !== tld));
                      }
                    }}
                  />
                  {' '}{tld}
                </label>
              );
            })}
          </div> */}
          <button
            onClick={() => handleSubmit()}
          >
            Get Domains!
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <div>Domains</div>
          {domainOptions.map((value, index) => {
            return <div key={index}>{value}</div>;
          })}
          {domainOptions.length === 0 && <div style={{ color: 'gray', fontSize: '12px' }}>(domains will appear here)</div>}


        </div>
      </div>
    </>
  );
}

export default App;
