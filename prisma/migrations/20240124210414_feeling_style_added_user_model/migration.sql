-- CreateEnum
CREATE TYPE "FeelingStyle" AS ENUM ('WHEEL', 'EMOJI', 'INPUT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "FeelingStyle" "FeelingStyle" NOT NULL DEFAULT 'WHEEL';
