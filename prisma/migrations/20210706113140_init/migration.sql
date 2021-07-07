/*
  Warnings:

  - You are about to drop the `Fish` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Fish";

-- CreateTable
CREATE TABLE "nigiri" (
    "id" SERIAL NOT NULL,
    "jpName" TEXT NOT NULL,
    "enName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "texture" TEXT,
    "cooked" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
