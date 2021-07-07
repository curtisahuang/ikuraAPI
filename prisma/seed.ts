import { fishList }  from "./fishdata";
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

async function main() {
    const deleteUsers = await prisma.fish.deleteMany({})
    for (let aFish of fishList) {
        await prisma.fish.create({
            data: aFish
        });
    }
    // await prisma.fish.create({data: fish})
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})