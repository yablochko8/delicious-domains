# File created using Typespark

------------------------

To fire up your frontend, run:
`npm --prefix frontend run dev`

To fire up your server, run:
`cd server && bun --watch server.ts && cd ..`

To fire up your database, run:
`cd server && npx --prefix ./server prisma studio --schema ./prisma/schema.prisma && cd ..`

The command for firing up everything is:
`pm2 delete all || true && pm2 start 'npm --prefix frontend run dev' --name devclient && pm2 start 'cd server && bun --watch server.ts && cd ..' --name devserver && pm2 start 'cd server && npx --prefix ./server prisma studio --schema ./prisma/schema.prisma && cd ..' --name prismastudio && pm2 logs`

