import { useEffect } from "react";
import "./App.css";
import { checkLimits } from "./serverCalls";
import { DomainList } from "./components/DomainList";
import { useSearchStateStore } from "./stores/searchStateStore";
import { TopNav } from "./components/TopNav";
import { InputForm } from "./components/InputForm";
import { useDisplayStateStore } from "./stores/displayStateStore";


function App() {

  // Request state and output

  const { assessments: assessedDomains } = useSearchStateStore();
  const { isRefining } = useDisplayStateStore();


  // Wake the server when the page loads (because this is on Free plan on Render)
  useEffect(() => {
    const wakeTheServer = async () => {
      const reportedMaxDomains = await checkLimits();
      console.log("Max domains:", reportedMaxDomains);
      // This will prob be useful on the frontend eventually
    };
    wakeTheServer();
  }, []);

  const hasResults = assessedDomains.completed.length > 0;

  return (
    <>
      <TopNav />
      <div className="flex flex-col w-full space-y-4 p-4">
        {(!hasResults || isRefining) && (
          <InputForm />
        )}

        <div>
          <div className="flex flex-row w-full min-h-screen">
            <div className="flex flex-col text-center justify-start items-center p-4 gap-4 w-full">
              {/* EXPLAINER TEXT */}
              {assessedDomains.completed.length > 0 && (
                <>
                  <div className="text-sm">
                    Domains ranked using AI scoring. Like and reject domains to get better results.
                  </div>
                </>
              )}

              {/* RESULTS */}
              {assessedDomains.completed.length > 0 && (
                <DomainList domainOptions={assessedDomains.completed} />
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

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
