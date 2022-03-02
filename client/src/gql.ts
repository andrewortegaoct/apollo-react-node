import { gql } from "@apollo/client";

export const LOOKUP_ZIP_CODE = gql`
  query LookupZipCode($countryCode: String!, $zipCode: Int!) {
    lookupZipCode(countryCode: $countryCode, zipCode: $zipCode) {
      country
      country_abb
      places {
        name
        longitude
        latitude
        state
        state_abb
      }
    }
  }
`;
