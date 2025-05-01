import "./App.css";
import { DomainList } from "./components/DomainList";
import { useSearchStateStore } from "./stores/searchStateStore";
import { TopNav } from "./components/TopNav";
import { InputForm } from "./components/InputForm";
import { useDisplayStateStore } from "./stores/displayStateStore";
import { ActionButtons } from "./components/ActionButtons";
import { RefineModal } from "./components/RefineModal";
import { ProgressMessage } from "./components/ProgressMessage";
import { AboutModal } from "./components/AboutModal";
// import { HomepageInfoSection1, HomepageInfoSection2 } from "./components/HomepageInfoSection";


function App() {
  const { assessments: assessedDomains } = useSearchStateStore();
  const { isRefining } = useDisplayStateStore();

  const hasResults = assessedDomains.completed.length > 0;

  return (
    <div className="blue-white-ellipse w-full">
      <TopNav />
      <div className="flex flex-col w-full max-w-2xl mx-auto pb-14 pt-14  pb-14 md:pb-0 max-h-[100dvh] min-h-[100dvh]">
        <div className="flex flex-col w-full space-y-4 px-4">

          {/* LANDING PAGE INPUT */}
          {(!hasResults) && (
            <div className="flex flex-col pt-10 md:pt-40 gap-5">
              <h1 className="text-center md:text-left">Generate memorable, available <strong>domains</strong></h1>
              <h2 className="text-center md:text-left">Automatically rank options based on six metrics, all domains under $100/year</h2>
              <InputForm />
            </div>
          )}

          {/* DESKTOP REFINE FORM (mobile is in RefineModal) */}
          {(hasResults && isRefining) && (
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
                  {assessedDomains.completed.length > 0 && (
                    <DomainList domainOptions={assessedDomains.completed} />
                  )}

                  {/* IN PROGRESS */}
                  {assessedDomains.inProgress.length > 0 && (
                    <ProgressMessage domains={assessedDomains.inProgress} />
                  )}
                </div>
              </div>
            </div>
          )}
          {/* <HomepageInfoSection1 />
          <HomepageInfoSection2 /> */}
        </div >

        {/* MOBILE ACTION BUTTONS (desktop ones are in the top nav) */}
        <div className="flex fixed bottom-0 w-full gap-2 border-t bg-base-100 border-base-content/20 p-2 justify-center md:justify-end md:hidden">
          <ActionButtons />
        </div>
      </div>

      {/* MODALS */}
      <RefineModal />
      <AboutModal />
    </div>
  );
}

export default App;
