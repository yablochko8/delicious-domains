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

- fix background gradient to scroll
- ⁠The low opacity on the results card could be fixed by instead using a block colour, but personally, I think the low opacity looks okay to me
- ⁠I think you should try it with the background non-sticky/fixed. So when you scroll down, it just scrolls into a white background ensuring the blue gradient part is always at the top of the page. This should help with the low opacity results feel, and the overlapping of the results above the nav bar too.
- ⁠You may be working on this next, but just thought I'd mention the main user input I think just needs completing with the buttons etc.
- ⁠On my mobile, I can't scroll down on the main page either, so the actual user input box is hidden. - just a not on this is that the user input box and the hero text, and perhaps a peek of the about section underneath should be within the 100VH.

BACKLOG:

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

- move score adjustment into modal
- simplify domain card
- better selection (highlighting full row)
- more emphasis on domain name
- make more clear what score is
- hide input form after initial click
- show all actions on modal
- remove dev mode
- server caching
- mobile: results: make actions visible
- mobile: score modal: make actions visible
- fix the focus expansion for input form on mobile
- better coloring on like & reject buttons
- switch to gpt 4.1 mini
- choose actual domain
- connect netlify to actual domain
- add plausible analytics
- refactor all those button components to something clearer
- Plausible custom events
- upgrade server to paid
- shorten the about page
- add in end-of-journey Action (eg go buy domain)
- misc details into index.html
- add favicon
- Enter equals generate always
- if name included in description, insist on it being in the results
- make prompting better
- move to a higher quality AI model
- log queries
- show/hide impossible domains
- ⁠One last thing is the fonts. Think I've forgotten to mention, but have been using "Inter" on the Figma design, which is available on Google Fonts for free. This will do a lot to uplift
