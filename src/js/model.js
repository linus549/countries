import countries from "../countries.json";
import { errorMessage } from "./config";

const state = {
  country: null,
  mapClickLatlng: null,
  currentFetchAttempt: 1,
  errorMessage: { ...errorMessage.DEFAULT },
};

export function setCountryByCode(alpha2Code) {
  state.country = countries.find(
    (country) => country.alpha2Code === alpha2Code
  );
}

export function resetErrorMessage() {
  state.errorMessage = { ...errorMessage.DEFAULT };
}

export default state;
