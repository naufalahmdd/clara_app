/*
  Warnings:

  - Changed the type of `provider` on the `auth_users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserProvider" AS ENUM ('google');

-- AlterTable
ALTER TABLE "auth_users" DROP COLUMN "provider",
ADD COLUMN     "provider" "UserProvider" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "auth_users_provider_providerId_key" ON "auth_users"("provider", "providerId");
