const service = require("./service");

const mapPlace = (place) => {
  const { state, longitude, latitude } = place;
  const name = place["place name"];
  const state_abb = place["state abbreviation"];
  return { name, longitude, state, state_abb, latitude };
};

const resolvers = {
  Query: {
    lookupZipCode: async (parent, args, context, info) => {
      const { countryCode, zipCode } = args;
      const { data } = await service.lookupZipCode(countryCode, zipCode);
      const post_code = data["post code"];
      const country_abb = data["country abbreviation"];
      const { country, places } = data;
      return {
        post_code,
        country,
        country_abb,
        places: places.map(mapPlace),
      };
    },
  },
};

module.exports = resolvers;
