import { makeSchema, objectType, nonNull, stringArg, arg } from "nexus";
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

        t.nonNull.field("fishByJpName", {
            type: "Fish",
            args: {
                jpName: stringArg()
            },
            resolve: (_parent, args, context: Context) => {
                return context.prisma.fish.findFirst({
                    where: { jpName: args.jpName},
                })
            },
        })
    }
})

const Fish = objectType({
    name: "Fish",
    definition(t) {
        t.nonNull.string('id')
        t.nonNull.string('jpName')
        t.nonNull.string('enName')
        t.nonNull.string("notes")
        t.nonNull.boolean("cooked")
    }
})

export const schema = makeSchema({
    types: [
        Query,
        Fish,
    ],
    outputs: {
        typegen: join(__dirname, "..", "nexus-typegen.ts"),
        schema: join(__dirname, "..", "schema.graphql"),
    },
})