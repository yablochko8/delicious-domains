# File created using Typespark

---

To start dev environment...

Terminal 1:

`cd server`
`npm i`
`bun --watch server.ts`

Terminal 2:

`cd frontend`
`npm i`
`npm run dev`

---

TO DO:

- ⁠The low opacity on the results card could be fixed by instead using a block colour, but personally, I think the low opacity looks okay to me
- ⁠You may be working on this next, but just thought I'd mention the main user input I think just needs completing with the buttons etc.
- ⁠On my mobile, I can't scroll down on the main page either, so the actual user input box is hidden. - just a not on this is that the user input box and the hero text, and perhaps a peek of the about section underneath should be within the 100VH.

BACKLOG:

- Give the Advanced Options a light background
- fix scrolling on EditInputsButton
- different detail modal for invalid domains
- newest results should be coloured differently
- log specific likes & rejections
- fetch TLD shortlist first, not in main call
- don't fetch scores for invalid domains
- turn export into a "seek feedback" button
- fix flash during modal load
- add validation check for deal breakers (copycat, annoying, esoteric)
- make scoring categories adjustable by end user
- add back in suggested vibes (with highlighting)
- smoother results loading
- use whois call to remove calls to domainr for domains that are definitely taken

DONE:

- close expanded domain card upon like
- activate input on first load
- fix dark mode
- sometimes the scroll goes to the wrong place
- fix background gradient to scroll
