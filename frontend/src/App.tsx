import "./App.css";
import { DomainList } from "./components/DomainList";
import { useSearchStateStore } from "./stores/searchStateStoreV2";
import { TopNav } from "./components/TopNav";
import { InputForm } from "./components/InputForm";
import { useDisplayStateStore } from "./stores/displayStateStore";
import { RefineModal } from "./modals/RefineModal";
import { ProgressMessage } from "./components/ProgressMessage";
import { AboutModal } from "./modals/AboutModal";
import { FloatingActionBar } from "./components/FloatingActionBar";
import { HomepageInfo } from "./components/HomepageInfo";
import { Footer } from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router";
import { SurveyPage } from "./pages/SurveyPage1";
import { ResultsPage } from "./pages/ResultsPage1";
import { CreateSurveyModal } from "./modals/CreateSurveyModal";

const DefaultHomepage = () => {
  const { domains } = useSearchStateStore();
  const { isRefining } = useDisplayStateStore();

  const hasResults = domains.length > 0;
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] space-y-4 px-4">
      {/* LANDING PAGE INPUT */}
      {!hasResults && (
        <div className="flex flex-col pt-10 md:pt-40 gap-5">
          <h1 className="text-center md:text-left">
            Dream up the perfect <strong>website name</strong>
          </h1>
          <div className="text-subtitle text-center md:text-left">
            Generate and stack-rank great domain names! Our AI will come up with
            names inspired by your description, and show you the best options
            that are not taken, and have standard pricing.
          </div>
          <InputForm />
          <HomepageInfo />
        </div>
      )}

      {/* DESKTOP REFINE FORM (mobile is in RefineModal) */}
      {hasResults && isRefining && (
        <div className="flex flex-col text-sm hidden md:block">
          <InputForm />
        </div>
      )}

      {/* RESULTS */}
      {hasResults && (
        <div>
          <div className="flex flex-row w-full">
            <div className="flex flex-col text-center justify-start items-center py-4 gap-4 w-full">
              {/* RESULTS */}
              {domains.length > 0 && <DomainList domainOptions={domains} />}

              {/* IN PROGRESS */}
              {domains.filter((domain) => domain.status === "fetching").length >
                0 && (
                <ProgressMessage
                  domains={domains
                    .filter((domain) => domain.status === "fetching")
                    .map((domain) => domain.domain)}
                />
              )}
            </div>
          </div>
          <FloatingActionBar />
        </div>
      )}
      {/* MODALS */}
      <RefineModal />
      <CreateSurveyModal />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="blue-white-ellipse w-full">
        <TopNav />
        <Routes>
          <Route path="/survey/:surveyId/results" element={<ResultsPage />} />
          <Route path="/survey/:surveyId" element={<SurveyPage />} />
          <Route path="/" element={<DefaultHomepage />} />
        </Routes>
      </div>
      <AboutModal />
    </BrowserRouter>
  );
}

export default App;
