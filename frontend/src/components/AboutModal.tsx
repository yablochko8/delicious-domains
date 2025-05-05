import { WEBSITE_NAME } from "../config";
import { SocialIcons } from "../assets/Icons";

export const AboutModal = () => {
  return (
    <dialog id={`about-modal`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-neutral-content">
        <AboutContents />
        <div className="modal-action justify-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="pill-button tertiary-action-button">back</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
};

const AboutContents = () => {
  return (
    <div className="flex flex-col gap-4 text-sm text-justify text-about">
      <h3>
        This tool gives you website name ideas, but only shows cheap, available
        domains.
      </h3>

      <div>
        It includes lots of the "dot-something" domains (e.g. .art, .book,
        .cat). Conventional wisdom says these are a terrible idea. Paul Graham
        advocates to stick to dotcom domains (
        <a
          href="http://aux.messymatters.com/pgnames.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          2006
        </a>
        ,{" "}
        <a
          href="https://paulgraham.com/name.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          2015
        </a>
        ).
      </div>

      <div>
        That said, there are now over 1,000 top-level domains, and you probably
        haven't heard of most of them. If you just need a quick, cheap,
        descriptive domain they open up a ton of options.
      </div>

      <div>
        Every domain shown should come in under $100, with the exception of .ai
        domains which have a sneaky two-year minimum. {WEBSITE_NAME} excludes
        all premium / resale / auction domains from results.
      </div>

      <div className="flex flex-col gap-2 text-xs">
        <div className="font-medium">
          Some inspiration for scoring categories:
        </div>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <a
              href="https://messymatters.com/nominology"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nominology (dreeves, 2011)
            </a>
          </li>
          <li>
            <a
              href="https://discoversprout.com/blog/2019/4/24/choosing-a-company-name-the-smile-test"
              target="_blank"
              rel="noopener noreferrer"
            >
              The SMILE Test (Jason Manarchuck, 2009)
            </a>
          </li>
        </ul>
        <div className="font-medium">Other good tools:</div>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <a
              href="https://domatron.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Domatron: (good for .com names)
            </a>
          </li>
          <li>
            <a
              href="https://instantdomainsearch.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instant Domain Search: (good for everything else)
            </a>
          </li>
        </ul>

        <div className="flex flex-row gap-2 border-t pt-2 border-neutral items-center text-sm">
          Get in touch with the site creator:
          <a
            href="mailto:lui@earful.fm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            {SocialIcons.email}
          </a>
          <a
            href="https://x.com/yablochko"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            {SocialIcons.twitter}
          </a>
          <a
            href="https://bsky.app/profile/yablochko.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bluesky"
          >
            {SocialIcons.bluesky}
          </a>
          <a
            href="https://lui.ie/projects"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Homepage"
          >
            {SocialIcons.home}
          </a>
        </div>
        <div className="flex flex-row items-center text-sm">
          or...
          <a
            href="https://airtable.com/appsNMKNh2267ygc4/shrvsd0gMivg4DbBN"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Feedback"
          >
            send anonymous feedback
          </a>
          .
        </div>
      </div>
    </div>
  );
};
