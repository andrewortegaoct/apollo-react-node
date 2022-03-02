import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useForm } from "react-hook-form";

import { IAddress, ICountry } from "./model";

import "./App.css";
import { LOOKUP_ZIP_CODE } from "./gql";

const Countries: ICountry[] = [
  {
    value: "us",
    label: "USA",
  },
  {
    value: "de",
    label: "Germany",
  },
  {
    value: "es",
    label: "Spain",
  },
  {
    value: "fr",
    label: "France",
  },
];

function App() {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const client = useApolloClient();
  const { register, handleSubmit } = useForm();

  const onClear = () => {
    setAddresses([]);
    setErrorMessage("");
  };

  const onSearch = async (formData: any) => {
    setErrorMessage("");
    const { countryCode, zipCode } = formData;
    if (!countryCode || !zipCode) return;

    try {
      const {
        data: { lookupZipCode },
      } = await client.query({
        query: LOOKUP_ZIP_CODE,
        variables: { countryCode, zipCode: +zipCode },
      });
      if (lookupZipCode) {
        setAddresses((prev) => [...prev, lookupZipCode]);
      }
    } catch (error) {
      setErrorMessage("Can't find address");
    }
  };

  return (
    <div className="container">
      <div className="page">
        <form onSubmit={handleSubmit(onSearch)}>
          <select defaultValue="us" {...register("countryCode")}>
            {Countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Enter Zip Code..."
            {...register("zipCode", { required: true })}
          />
          <input type="submit" />
        </form>
        {!!errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
        <div className="list-container">
          <button type="button" className="btn-md" onClick={onClear}>
            Clear
          </button>
          <div className="list">
            {addresses.map((address, index) => (
              <div className="item" key={`address-${index}`}>
                <span>Country: {address.country}</span>
                {address.places.map((place) => (
                  <div key={place.name} className="place">
                    <span>Place: {place.name}</span>
                    <span>State: {place.state}</span>
                    <span>Longitude: {place.longitude}</span>
                    <span>Latitude: {place.latitude}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
