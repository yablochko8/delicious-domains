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

- add in end-of-journey Action (eg go buy domain)
- choose actual domain
- add favicon
- connect netlify to actual domain
- upgrade server to paid
- add plausible analytics
- misc details into index.html
- add success measurements

BACKLOG:

- different detail modal for invalid domains
- don't fetch scores for invalid domains
- show/hide impossible domains
- fix flash during modal load
- consider adding check for deal breakers (copycat, annoying, esoteric)
- turn options into a feedback survey
- make scoring categories adjustable by end user
- highlight selected vibes
- smoother results loading
- refactor all those button components to something clearer
- shorten the about page

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
