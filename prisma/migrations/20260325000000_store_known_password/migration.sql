ALTER TABLE "User"
ADD COLUMN "knownPasswordEnc" TEXT,
ADD COLUMN "knownPasswordSetAt" TIMESTAMP(3);

