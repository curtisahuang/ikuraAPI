import { toIdValue } from "apollo-utilities";
import { makeSchema, objectType, nonNull, stringArg, arg, inputObjectType, booleanArg } from "nexus";
import { join } from "path";
import { isAnyArrayBuffer } from "util/types";
import { Context } from "./context"

const Query = objectType({
    name: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('allFish', {
            type: "Fish",
            resolve: (_parent, _args, context: Context) => {
                return context.prisma.fish.findMany()
            },
        })

        t.nullable.field("findFishByRomaji", {
            type: "Fish",
            args: {
                jpName: stringArg()
            },
            resolve: (_parent, args, context: Context) => {
                return context.prisma.fish.findFirst({
                    where: { jpName: args.jpName || undefined},
                })
            },
        })


        t.nullable.field("findFishByKana", {
            type: "Fish",
            args: {
                kanaName: stringArg()
            },
            resolve: (_parent, args, context: Context) => {
                return context.prisma.fish.findFirst({
                    where: { kanaName: args.kanaName || undefined},
                })
            },
        })

        t.nullable.field("findFishByKanji", {
            type: "Fish",
            args: {
                kanjiName: stringArg()
            },
            resolve: (_parent, args, context: Context) => {
                return context.prisma.fish.findFirst({
                    where: { kanjiName: args.kanjiName || undefined},
                })
            },
        })

        t.nullable.field("findFishByEnglishName", {
            type: "Fish",
            args: {
                enName: stringArg()
            },
            resolve: (_parent, args, context: Context) => {
                const result = context.prisma.fish.findFirst({
                    where: { enName: args.enName || undefined},
                })
                console.dir(result);
                return result;
            },
        })

        t.nonNull.list.nonNull.field("findFishByPreparation", {
            type: "Fish",
            args: { 
                cooked: booleanArg()
            },
            resolve: async (_parent, args, context: Context) => {
                const result = await context.prisma.fish.findMany({
                    where: { cooked: args.cooked }
                })
                console.log(result)
                return result;
            },
        })

        t.nonNull.list.nonNull.field("findFishByColor", {
            type: "Fish",
            args: {
                color: stringArg()
            },
            resolve: async (_parent, args, context: Context) => {
                const result = await context.prisma.fish.findMany({
                    where: {
                        fish_characteristics: {
                            some: {
                                OR: [
                                    {color1: args.color},
                                    {color2: args.color}
                                ]
                            }
                        }
                    }
                })
                return result;
            }
        })

        t.nonNull.list.nonNull.field("findFishByTexture", {
            type: "Fish",
            args: {
                texture: stringArg()
            },
            resolve: async (_parent, args, context: Context) => {
                const result = await context.prisma.fish.findMany({
                    where: {
                        fish_characteristics: {
                            some: {
                                texture: args.texture
                            }
                        }
                    }
                })
                return result;
            }
        })
    }
})

const Mutation = objectType({
    name: "Mutation",
    definition(t) {
        t.nonNull.field("createFish", {
            type: "Fish",
            args: {
                data: nonNull(
                    arg({
                        type: "FishCreateInput",
                    }),
                ),
            },
            resolve: (_, args, context: Context) => {
                return context.prisma.fish.create({
                    data: {
                        jpName: args.data.jpName,
                        enName: args.data.enName,
                        kanaName: args.data.kanaName || null,
                        kanjiName: args.data.kanjiName || null,
                        cooked: args.data.cooked,
                        notes: args.data.notes || null,
                        fish_characteristics: {
                            create: {
                                color1: args.data.fishCharacteristics.color1,
                                color2: args.data.fishCharacteristics.color2 || null,
                                texture: args.data.fishCharacteristics.texture || null,
                                family: args.data.fishCharacteristics.family || null,
                                genus: args.data.fishCharacteristics.genus || null,
                            },
                        },
                    },
                })
            },
        })

        t.field("updateNotesById", {
            type: "Fish",
            args: {
                id: nonNull(stringArg()),
                updateNotes: stringArg()
            },
            resolve: async (_, args, context: Context) => {
                return context.prisma.fish.update({
                    where: { id: args.id || undefined },
                    data: {
                        notes: args.updateNotes
                    }
                })
            }
        })

        t.field("deleteFishById", {
            type:"Fish",
            args: {
                id: nonNull(stringArg()),
            },
            resolve: (_, args, context: Context) => {
                return context.prisma.fish.delete({
                    where: { id: args.id },
                })
            }
        })
    },
})

const Fish = objectType({
    name: "Fish",
    definition(t) {
        t.nonNull.string('id')
        t.nonNull.string('jpName')
        t.string('kanaName')
        t.string('kanjiName')                
        t.nonNull.string('enName')
        t.nonNull.string("notes")
        t.nonNull.boolean("cooked")
        t.nonNull.list.nonNull.field("fishCharacteristics", {
            type: "FishCharacteristics",
            resolve: (parent, _, context: Context) => {
                return context.prisma.fish
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .fish_characteristics()
            }
        })
    }
})

const FishCharacteristics = objectType({
    name: "FishCharacteristics",
    definition(t) {
        t.nonNull.string('color1')
        t.string("color2")
        t.string("texture")
        t.string("family")
        t.string("genus")
    }
})

const FishCharacteristicsCreateInput = inputObjectType({
    name: "FishCharacteristicsCreateInput",
    definition(t) {
        t.nonNull.string('color1')
        t.string("color2")
        t.string("texture")
        t.string("family")
        t.string("genus")
    }
})

const FishCreateInput = inputObjectType({
    name:"FishCreateInput",
    definition(t) {
        t.nonNull.string("jpName")
        t.nullable.string("kanaName")
        t.nullable.string("kanjiName")
        t.nonNull.string("enName")
        t.nullable.string("notes")
        t.nonNull.boolean("cooked")
        t.nonNull.field("fishCharacteristics", { type: "FishCharacteristicsCreateInput" })
    }
})

// const FishCharacteristicsUpdateInput = inputObjectType({
//     name: "FishCharacteristicsUpdateInput",
//     definition(t) {
//         t.string('color1')
//         t.string("color2")
//         t.string("texture")
//         t.string("family")
//         t.string("genus")
//     }
// })

// const FishUpdateInput = inputObjectType({
//     name:"FishUpdateInput",
//     definition(t) {
//         t.string("jpName")
//         t.string("enName")
//         t.string("notes")
//         t.boolean("cooked")
//         t.field("fishCharacteristics", { type: "FishCharacteristicsUpdateInput" })
//     }
// })

export const schema = makeSchema({
    types: [
        Query,
        Mutation,
        Fish,
        FishCharacteristicsCreateInput,
        FishCharacteristics,
        FishCreateInput,
        // FishCharacteristicsUpdateInput,
        // FishUpdateInput,
    ],
    outputs: {
        typegen: join(__dirname, "..", "nexus-typegen.ts"),
        schema: join(__dirname, "..", "schema.graphql"),
    },
})