-- CreateEnum
CREATE TYPE "RoleList" AS ENUM ('CUSTOMER', 'ADMIN');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "RoleList" NOT NULL DEFAULT 'CUSTOMER';
