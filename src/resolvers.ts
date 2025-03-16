import type { Resolvers } from "./types";
import { validateFullAmenities } from "./helpers";

export const resolvers: Resolvers = {
  Query: {
    featuredListings: (_, __, { dataSources }) => {
      return dataSources.listingAPI.listFeaturedListings();
    },
    listing: (_parent, { id }, { dataSources }) => {
      return dataSources.listingAPI.getListing(id);
    },
  },
  Listing: {
    amenities: ({ id, amenities }, _, { dataSources }) => {
      return validateFullAmenities(amenities)
        ? amenities
        : dataSources.listingAPI.getAmenities(id)
    },
  },
  Mutation: {
    createListing: async (_, { input }, { dataSources }) => {
      const response = await dataSources.listingAPI.createListing(input);

      // everything succeeds with the mutation
      return {
        code: 200,
        success: true,
        message: "Listing successfully created!",
        listing: response
      };
    },
  },
};