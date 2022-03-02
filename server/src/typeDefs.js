const { gql } = require("apollo-server");

const typeDefs = gql`
  type Place {
    name: String
    longitude: String
    state: String
    state_abb: String
    latitude: String
  }

  type Result {
    post_code: String
    country: String
    country_abb: String
    places: [Place]
  }

  type Query {
    lookupZipCode(countryCode: String!, zipCode: Int): Result
  }
`;

module.exports = typeDefs;
