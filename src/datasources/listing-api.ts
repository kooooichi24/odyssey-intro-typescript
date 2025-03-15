import { RESTDataSource } from "@apollo/datasource-rest";

export class ListingAPI extends RESTDataSource {
  baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

  getFeaturedListings() {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return this.get<any[]>("featured-listings");
  }
}