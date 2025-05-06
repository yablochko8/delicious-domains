import { ActionIcons } from "../assets/Icons";

const HomePageInfoSectionTemplate = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row w-full border-t border-gray-300 text-zinc-800 py-4">
      <div className="flex flex-col md:flex-row w-full items-start gap-4 text-sm">
        <div className="md:w-1/2 space-y-4">
          <h3 className="font-semibold text-base text-black">{heading}</h3>
        </div>
        <div className="md:w-1/2 text-justify space-y-4 text-about">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ABOUT_TEXT_A = "This is an AI-powered domain name generator.";

export const ABOUT_TEXT_B = `We ask the AI to generate domain names that are well suited to your
        project, matching any stylistic preferences you have included. We take
        the generated list of options and check which domain names are
        available, and then use a few tricks to score each name and try to work
        out which ones are the best. If a domain name is marked as "premium" or
        "available via a broker" we disregard it, letting you focus on the
        options that come in at standard pricing.`;

export const ABOUT_TEXT_C = `The result: a ranked list of domain names that are available to
        register, typically under $100/year (and sometimes much cheaper).`;

const HomepageInfoSection0 = () => {
  return (
    <HomePageInfoSectionTemplate heading="What is this?">
      <p>{ABOUT_TEXT_A}</p>
      <p>{ABOUT_TEXT_B}</p>
      <p>{ABOUT_TEXT_C}</p>
    </HomePageInfoSectionTemplate>
  );
};

const HomepageInfoSection1 = () => {
  return (
    <HomePageInfoSectionTemplate heading="How are the domains ranked?">
      <p>
        We score each domain for six different qualities, assessing if it is
        Evocative, Brief, Pronounceable, Findable, Spellable, and Extendable.
        Explanations of these terms can be found on the results page.
      </p>
      <p>
        This scoring system builds on the work of{" "}
        <a
          href="https://messymatters.com/nominology"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nominology
        </a>{" "}
        and{" "}
        <a
          href="https://discoversprout.com/blog/2019/4/24/choosing-a-company-name-the-smile-test"
          target="_blank"
          rel="noopener noreferrer"
        >
          The SMILE Test
        </a>
        .
      </p>
      <p>
        To get even better results: click Like on a few options that are closest
        to the vibe you're going for, and reject ones which are way off, then
        click "Generate More". The AI will take your feedback into account and
        find options that better suit your taste.
      </p>
    </HomePageInfoSectionTemplate>
  );
};

const HomepageInfoSection2 = () => {
  return (
    <HomePageInfoSectionTemplate heading="Some of these look quite unusual?">
      <p>
        This tool shows lots of the "dot-something" domains (.art, .book, .cat
        etc). Conventional wisdom says these are a terrible idea.{" "}
        <a
          href="https://paulgraham.com/name.html"
          className="underline text-gray-700 hover:text-black"
        >
          Paul Graham
        </a>{" "}
        advocates to stick to dotcom domains.
      </p>
      <p>
        That said, there are now over 1,000 top-level domains, and you probably
        haven't heard of most of them. If you just need a quick, cheap,
        descriptive domain they open up a ton of options.
      </p>
    </HomePageInfoSectionTemplate>
  );
};

const HomepageInfoSection3 = () => {
  return (
    <HomePageInfoSectionTemplate heading="Got some feedback? We’d love to hear from you!">
      <p>
        If you have some ideas for how we can make this tool better, please let
        us know using our anonymous feedback form below:
      </p>
      <div className="flex flex-row justify-end p-6">
        <button className="pill-button tertiary-action-button">
          <span>{ActionIcons.feedback}</span> Submit Feedback
        </button>
      </div>
    </HomePageInfoSectionTemplate>
  );
};

export const HomepageInfo = () => {
  return (
    <>
      <HomepageInfoSection0 />
      <HomepageInfoSection1 />
      <HomepageInfoSection2 />
      <HomepageInfoSection3 />
    </>
  );
};
