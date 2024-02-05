-- CreateEnum
CREATE TYPE "GoalMagnitude" AS ENUM ('SMALL', 'STANDARD', 'LONGTERM', 'LIFETIME');

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "textGoal" TEXT NOT NULL,
    "numberGoal" DOUBLE PRECISION,
    "setOn" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "completedOn" TIMESTAMP(3) NOT NULL,
    "magnitude" "GoalMagnitude" NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
