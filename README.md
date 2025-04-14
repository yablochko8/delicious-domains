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

results

- make more clear what score is
- hide input form after initial click
- show/hide impossible domains
- show all actions on modal
- smoother results loading
- fix input buttons on modal

input form

- highlight selected vibes
- bug: input focus sometimes blocks button click

outcome

- add in end-of-journey Action (eg go buy domain)

go live

- server caching
- choose actual domain
- add favicon
- connect netlify to actual domain
- upgrade server to paid
- remove dev mode

BACKLOG:

- fix flash during modal load
- consider adding check for deal breakers (copycat, annoying, esoteric)
- feedback survey
- make scoring categories adjustable by end user

DONE:

- move score adjustment into modal
- simplify domain card
- better selection (highlighting full row)
- more emphasis on domain name
