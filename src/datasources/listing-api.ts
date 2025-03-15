import { RESTDataSource } from "@apollo/datasource-rest";
import type { Listing } from "../types";

export class ListingAPI extends RESTDataSource {
  baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

  listFeaturedListings(): Promise<Listing[]> {
    return this.get<Listing[]>("featured-listings");
  }
}