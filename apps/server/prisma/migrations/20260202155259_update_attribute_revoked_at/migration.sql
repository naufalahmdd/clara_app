/*
  Warnings:

  - The `revokedAt` column on the `auth_sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "auth_sessions" DROP COLUMN "revokedAt",
ADD COLUMN     "revokedAt" TIMESTAMP(3);
