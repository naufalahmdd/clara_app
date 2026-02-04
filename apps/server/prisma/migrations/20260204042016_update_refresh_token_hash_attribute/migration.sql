/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `auth_sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refreshTokenHash]` on the table `auth_sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refreshTokenHash` to the `auth_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "auth_sessions_refreshToken_key";

-- AlterTable
ALTER TABLE "auth_sessions" DROP COLUMN "refreshToken",
ADD COLUMN     "refreshTokenHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "auth_sessions_refreshTokenHash_key" ON "auth_sessions"("refreshTokenHash");
