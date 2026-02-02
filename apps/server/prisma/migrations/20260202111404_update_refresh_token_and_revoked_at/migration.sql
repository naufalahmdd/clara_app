/*
  Warnings:

  - You are about to drop the column `refreshTokenHash` on the `auth_sessions` table. All the data in the column will be lost.
  - The `revokedAt` column on the `auth_sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[refreshToken]` on the table `auth_sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refreshToken` to the `auth_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auth_sessions" DROP COLUMN "refreshTokenHash",
ADD COLUMN     "refreshToken" TEXT NOT NULL,
DROP COLUMN "revokedAt",
ADD COLUMN     "revokedAt" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "auth_sessions_refreshToken_key" ON "auth_sessions"("refreshToken");
