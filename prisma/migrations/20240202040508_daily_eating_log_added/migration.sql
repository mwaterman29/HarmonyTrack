-- CreateTable
CREATE TABLE "EatingDay" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "calories" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,

    CONSTRAINT "EatingDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EatingDay" ADD CONSTRAINT "EatingDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
