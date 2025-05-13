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

- Implement Domain Price Filter (Under $100)
- Create Advanced Domain Generation Algorithm
- Add Trademark Warning Functionality
- Develop One-Click Domain Sharing Feature
- Build Feedback Survey Integration for Domain Suggestions
- Implement Domain Pronounceability Scoring Mechanism
- Design Iterative Domain Selection UI with Clear Filtering Options
- Add Persistent Exclusion of Previously Shown Domains
- Create Domain Comparison View with Detailed Criteria Breakdown

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

DONE:
