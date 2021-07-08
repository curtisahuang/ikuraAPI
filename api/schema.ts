import { toIdValue } from "apollo-utilities";
import { makeSchema, objectType, nonNull, stringArg, arg, inputObjectType } from "nexus";
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

        t.nullable.field("findFishByJapaneseName", {
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

        t.nullable.field("findFishByEnglishName", {
            type: "Fish",
            args: {
                enName: stringArg()
            },
            resolve: (_parent, args, context: Context) => {
                return context.prisma.fish.findFirst({
                    where: { enName: args.enName || undefined},
                })
            },
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
                const fishDetails = {
                    color1: args.data.fishCharacteristics.color1,
                    color2: args.data.fishCharacteristics.color2 || null,
                    texture: args.data.fishCharacteristics.texture || null,
                    family: args.data.fishCharacteristics.family || null,
                    genus: args.data.fishCharacteristics.genus || null,
                }
                return context.prisma.fish.create({
                    data: {
                        jpName: args.data.jpName,
                        enName: args.data.enName,
                        cooked: args.data.cooked,
                        notes: args.data.notes || null,
                        fish_characteristics: {
                            create: fishDetails,
                        },
                    },
                })
            },
        })
    },
})

const Fish = objectType({
    name: "Fish",
    definition(t) {
        t.nonNull.string('id')
        t.nonNull.string('jpName')
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
        t.nonNull.string("enName")
        t.nullable.string("notes")
        t.nonNull.boolean("cooked")
        t.nonNull.field("fishCharacteristics", { type: "FishCharacteristicsCreateInput" })
    }
})

export const schema = makeSchema({
    types: [
        Query,
        Mutation,
        Fish,
        FishCharacteristicsCreateInput,
        FishCharacteristics,
        FishCreateInput
    ],
    outputs: {
        typegen: join(__dirname, "..", "nexus-typegen.ts"),
        schema: join(__dirname, "..", "schema.graphql"),
    },
})