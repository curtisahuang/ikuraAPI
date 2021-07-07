-- CreateTable
CREATE TABLE "Fish" (
    "id" SERIAL NOT NULL,
    "jpName" TEXT NOT NULL,
    "enName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "texture" TEXT,
    "cooked" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
