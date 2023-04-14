import { showElements, hideElements } from "../helpers";

const rootElement = document.querySelector(".country");
const flagElement = document.querySelector(".country__flag");
const nameElement = document.querySelector(".country__name");
const regionElement = document.querySelector(".country__region");
const populationElement = document.querySelector(".country__population");
const languageElement = document.querySelector(".country__language");
const currencyElement = document.querySelector(".country__currency");
const capitalElement = document.querySelector(".country__capital");

export function update(country) {
  if (!country) {
    hideElements(rootElement);
    return;
  }

  showElements(rootElement);
  flagElement.src = `./img/${country.alpha3Code.toLowerCase()}.png`;
  flagElement.alt = "Flag of " + country.name;
  nameElement.textContent = country.name;
  regionElement.textContent = country.subregion;
  populationElement.textContent = formatPopulation(country.population);
  capitalElement.textContent = country.capital;

  languageElement.textContent = country.languages
    .map((language) => language.name)
    .join(", ");

  currencyElement.textContent = country.currencies
    .map((currency) => currency.name)
    .join(", ");
}

function formatPopulation(population) {
  // hundreds
  if (population < 1000) {
    return population;
  }
  // thousands
  if (population < 1000000) {
    population = Math.round(population / 1000);

    if (population > 100) {
      population = Math.round(population / 10) * 10;
    }

    return `${population} 000`;
  }
  // millions
  if (population < 1000000000) {
    const decimalPlace = population < 100000000 ? 1 : 0;
    population = (population / 1000000).toFixed(decimalPlace);

    return `${population} million`;
  }
  // billions
  return `${(population / 1000000000).toFixed(1)} billion`;
}
