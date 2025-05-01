import { PrismaClient } from "@prisma/client";
import fs from "fs";

// .gitignore ignores all outputs, but not this file:
// server/exports/export-*.json

const prisma = new PrismaClient();

const createExport = async () => {
  const data = await prisma.candidatesRequest.findMany({
    select: {
      id: true,
      purpose: true,
      vibe: true,
      preferredTlds: true,
      likedDomains: true,
      rejectedDomains: true,
      unratedDomains: true,
    },
  });

  const today = new Date();
  // export-2025-05-01.json
  const year = today.getFullYear();
  // Months in JavaScript's Date are 0-indexed (0-11)
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  // Days in JavaScript's Date are 1-indexed (1-31)
  const day = today.getDate().toString().padStart(2, "0");
  const fileName = `export-${year}-${month}-${day}.json`;

  fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  console.log(`✅ Export complete: ${fileName}`);
};

createExport()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
