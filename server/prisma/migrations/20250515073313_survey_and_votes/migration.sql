-- CreateTable
CREATE TABLE "domain_survey" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "domains" TEXT[],

    CONSTRAINT "domain_survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domain_survey_vote" (
    "id" SERIAL NOT NULL,
    "surveyId" INTEGER NOT NULL,
    "domain" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "domain_survey_vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "domain_survey_publicId_key" ON "domain_survey"("publicId");

-- CreateIndex
CREATE INDEX "domain_survey_publicId_idx" ON "domain_survey"("publicId");

-- AddForeignKey
ALTER TABLE "domain_survey_vote" ADD CONSTRAINT "domain_survey_vote_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "domain_survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
