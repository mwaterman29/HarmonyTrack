-- CreateTable
CREATE TABLE "Feeling" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "feeling" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feeling_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feeling" ADD CONSTRAINT "Feeling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
