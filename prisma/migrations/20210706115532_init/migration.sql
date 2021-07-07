/*
  Warnings:

  - You are about to drop the `nigiri` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "nigiri";

-- CreateTable
CREATE TABLE "fish" (
    "id" SERIAL NOT NULL,
    "jpName" TEXT NOT NULL,
    "enName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "texture" TEXT,
    "notes" TEXT,
    "cooked" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
