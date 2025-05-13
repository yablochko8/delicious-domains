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

- Only show Liked & New Domains
- Build Feedback Survey Integration for Domain Suggestions
- Generate Now button should not shrink when generating

FE BACKLOG:

- Put Advanced Options into main user input
- different detail modal for invalid domains
- newest results should be coloured differently
- turn export into a "seek feedback" button
- smoother results loading

BE BACKLOG:

- fetch TLD shortlist first, not in main call
- don't fetch scores for invalid domains
- use whois call to remove calls to domainr for domains that are definitely taken
- add validation check for deal breakers (copycat, annoying, esoteric)
- log specific likes & rejections

IDEA LONGLIST:

- User need: check for Trademark risk of similar names (Paddy at Baseline)
- Create Domain Comparison View with Detailed Criteria Breakdown

DONE:

- Show filters by default
- Make "Under $100" more clear
- One-click: more like this
- Clear all inputs when clicking on Home Logo
