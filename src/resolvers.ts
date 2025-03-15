import type { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    featuredListings: (_parent, _args, { dataSources }) => {
      return dataSources.listingAPI.listFeaturedListings();
    },
    listing: (_parent, { id }, { dataSources }) => {
      return dataSources.listingAPI.getListing(id);
    },
  },
};