import { SocialIcons } from "../assets/Icons";

export const Socials = () => {
  return (
    <>
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
    </>
  );
};
