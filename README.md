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

- Plausible custom events
- if name included in description, insist on it being in the results
- try a higher quality AI model
- newest results should be coloured differently
- add in end-of-journey Action (eg go buy domain)
- add favicon
- upgrade server to paid
- misc details into index.html
- logging
- different detail modal for invalid domains
- shorten the about page
- fix scrolling on EditInputsButton

BACKLOG:

- don't fetch scores for invalid domains
- turn export into a "seek feedback" button
- show/hide impossible domains
- fix flash during modal load
- consider adding check for deal breakers (copycat, annoying, esoteric)
- make scoring categories adjustable by end user
- add back in suggested vibes (with highlighting)
- smoother results loading
- refactor all those button components to something clearer
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
