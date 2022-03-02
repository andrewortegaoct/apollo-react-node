const axios = require("axios").default;

const APIClient = axios.create({
  baseURL: "http://api.zippopotam.us",
});

const lookupZipCode = (countryCode, zipCode) => {
  return APIClient.get(`/${countryCode}/${zipCode}`);
};

module.exports = { lookupZipCode };
