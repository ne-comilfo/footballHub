-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "apiSyncedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "apiSyncedAt" TIMESTAMP(3),
ADD COLUMN     "leagueId" TEXT;

-- CreateIndex
CREATE INDEX "Player_apiSyncedAt_idx" ON "Player"("apiSyncedAt");

-- CreateIndex
CREATE INDEX "Team_apiSyncedAt_idx" ON "Team"("apiSyncedAt");
