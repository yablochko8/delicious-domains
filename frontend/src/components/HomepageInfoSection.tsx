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
        <div className="md:w-1/2 text-justify space-y-4">{children}</div>
      </div>
    </div>
  );
};

const HomepageInfoSection0 = () => {
  return (
    <HomePageInfoSectionTemplate heading="What is this?">
      <p>
        This tool gives you website name ideas, but only shows available
        domains. It generates a list of possible names, checks which ones are
        available, and then scores each domain on six different fronts. The
        results you see are ranked by these scores, so hopefully the best
        options are near the top.
      </p>
      <p>
        To get even better results: click Like on a few options that are closest
        to the vibe you're going for, and reject ones which are way off, then
        click "Generate More". The AI will take into account your feedback and
        try to find options that better suit your taste.
      </p>
    </HomePageInfoSectionTemplate>
  );
};

const HomepageInfoSection1 = () => {
  return (
    <HomePageInfoSectionTemplate heading="Why not just stick to a long dotcom?">
      <p>
        This tool shows lots of the "dot-something" domains (e.g. .art, .book,
        .cat). Conventional wisdom says these are a terrible idea.{" "}
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
      <p>
        Every domain shown should come in under $100. The exception is .ai
        domains which have a sneaky two-year minimum. Dreamy Domains excludes
        all premium, resale, and auction domains from results.
      </p>
    </HomePageInfoSectionTemplate>
  );
};

const HomepageInfoSection2 = () => {
  return (
    <HomePageInfoSectionTemplate heading="Got some feedback? We’d love to hear from you!">
      <p>
        If you have some ideas for how we can make this tool better, please let
        us know using our anonymous feedback form below:
      </p>
      <div className="flex flex-row justify-center p-6">
        <button className="pill-button tertiary-action-button">
          <span>{ActionIcons.feedback}</span> Submit Feedback
        </button>
      </div>
    </HomePageInfoSectionTemplate>
  );
};

export const HomepageInfoSectionsAll = () => {
  return (
    <>
      <HomepageInfoSection0 />
      <HomepageInfoSection1 />
      <HomepageInfoSection2 />
    </>
  );
};
