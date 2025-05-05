import { ActionIcons } from "../assets/Icons";

const HomePageInfoSection = ({
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
        <div className="md:w-1/2 text-justify">{children}</div>
      </div>
    </div>
  );
};

export const HomepageInfoSection1 = () => {
  return (
    <HomePageInfoSection heading="What's included?">
      <p>
        It includes lots of the "dot-something" domains (e.g. .art, .book,
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
        Every domain shown should come in under $100, with the exception of .ai
        domains which have a sneaky two-year minimum. Dreamy Domains excludes
        all premium / resale / auction domains from results.
      </p>
    </HomePageInfoSection>
  );
};

export const HomepageInfoSection2 = () => {
  return (
    <HomePageInfoSection heading="Got some feedback? We’d love to hear from you!">
      <p>
        If you have some ideas for how we can make this tool better, please let
        us know using our anonymous feedback form below:
      </p>
      <button className="pill-button tertiary-action-button">
        <span>{ActionIcons.feedback}</span> Submit Feedback
      </button>
    </HomePageInfoSection>
  );
};
