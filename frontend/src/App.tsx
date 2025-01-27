import { useState } from "react";
import "./App.css";
import { sendInputsAndReturnDomains } from "./serverCalls";


function App() {
  const [input1Purpose, setInput1Purpose] = useState("");
  const [input2Vibe, setInput2Vibe] = useState("");
  const [domainOptions, setDomainOptions] = useState<string[]>([]);

  const handleSubmit = async () => {
    const domainList = await sendInputsAndReturnDomains({
      purpose: input1Purpose,
      vibe: input2Vibe,
    });
    setDomainOptions(domainList);
  };

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
      }}>
        <h1>Domain Finder</h1>

      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        minHeight: '100vh',
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <div>What does your app do?</div>
          <textarea
            placeholder='e.g. "linkedin for cattle trading"'
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
