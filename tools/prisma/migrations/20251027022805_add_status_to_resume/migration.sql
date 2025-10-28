-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'completed', 'failed');

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';
