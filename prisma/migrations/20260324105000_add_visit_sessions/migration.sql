-- CreateTable
CREATE TABLE "VisitSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "durationMs" INTEGER,
    CONSTRAINT "VisitSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VisitSession_userId_endedAt_lastSeenAt_idx" ON "VisitSession"("userId", "endedAt", "lastSeenAt");

-- AddForeignKey
ALTER TABLE "VisitSession" ADD CONSTRAINT "VisitSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
