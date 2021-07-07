/*
  Warnings:

  - You are about to drop the `fish` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "fish";

-- CreateTable
CREATE TABLE "Fish" (
    "id" TEXT NOT NULL,
    "jpName" TEXT NOT NULL,
    "enName" TEXT NOT NULL,
    "notes" TEXT,
    "cooked" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fish_Characteristics" (
    "char_id" TEXT NOT NULL,
    "fish_id" TEXT NOT NULL,
    "color1" TEXT NOT NULL,
    "color2" TEXT,
    "texture" TEXT NOT NULL,
    "family" TEXT,
    "genus" TEXT,

    PRIMARY KEY ("char_id")
);

-- AddForeignKey
ALTER TABLE "Fish_Characteristics" ADD FOREIGN KEY ("fish_id") REFERENCES "Fish"("id") ON DELETE CASCADE ON UPDATE CASCADE;
