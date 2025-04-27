-- CreateTable
CREATE TABLE "candidates_request" (
    "id" SERIAL NOT NULL,
    "purpose" TEXT NOT NULL,
    "vibe" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "targetQuantity" INTEGER NOT NULL,
    "preferredTlds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "likedDomains" TEXT[],
    "rejectedDomains" TEXT[],
    "unratedDomains" TEXT[],

    CONSTRAINT "candidates_request_pkey" PRIMARY KEY ("id")
);
