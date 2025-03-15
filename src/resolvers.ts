export const resolvers = {
  Query: {
    featuredListings: (_parent, _args, { dataSources }) => {
      return dataSources.listingAPI.getFeaturedListings();
    },
  },
};