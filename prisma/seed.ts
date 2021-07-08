import { fishList }  from "./fishdata";
import { PrismaClient, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

const fishData = fishList;

async function main() {
    const deleteUsers = await prisma.fish.deleteMany({})
    console.log(`Start Seeding`)
    for (const f of fishData) {
        const fish = await prisma.fish.create({
            data: f,
        })
        console.log(`create fish with id: ${fish.id}`)
    }
    console.log(`Seeding Finished`)
}

main()
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
})