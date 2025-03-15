import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "node:fs";
import path from "node:path";
import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";
import { resolvers } from "./resolvers";
import { ListingAPI } from "./datasources/listing-api";

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schema.graphql"), {
    encoding: "utf-8",
  })
);

async function startApolloServer(typeDefs: DocumentNode) {
  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;

      return {
        dataSources: {
          listingAPI: new ListingAPI({ cache }),
        },
      };
    },
  });

  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer(typeDefs);