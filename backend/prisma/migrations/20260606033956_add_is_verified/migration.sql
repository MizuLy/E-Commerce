/*
  Warnings:

  - You are about to drop the column `isVerified` on the `Otps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Otps" DROP COLUMN "isVerified";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
