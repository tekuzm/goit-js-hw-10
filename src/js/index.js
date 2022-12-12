import '../css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener(
  'input',
  debounce(inputChangeHandler, DEBOUNCE_DELAY)
);

function inputChangeHandler() {
  const name = refs.inputField.value.trim();

  // if input fiels is empty, clear search results
  if (!name) {
    clearResults();
    return;
  }

  fetchCountries(name)
    .then(countriesArray => {
      clearResults();

      // if search result is 1 country, create country card
      if (countriesArray.length < 2) {
        clearResults();
        createCountryCard(countriesArray[0]);
      } // if search result contains 2-10 countries, create list of countries
      else if (countriesArray.length >= 2 && countriesArray.length <= 10) {
        createCountryList(countriesArray);
      } // if search result contains >10 countries, show alert "Too many matches found. Please enter a more specific name."
      else {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(() => {
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    });
}

function clearResults() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function createCountryCard(country) {
  const countryDescription = `<div class="country-card"><div class="country-header"><img src="${
    country.flags.svg
  }" class="flag-img" alt="Flag" width=55 height=35><h2 class="country-card--name">${
    country.name.official
  }</h2></div><p class="country-description">Capital: <span class="country-description--value">${
    country.capital
  }</span></p><p class="country-description">Population: <span class="country-description--value">${
    country.population
  }</span></p><p class="country-description">Languages: <span class="country-description--value">${Object.values(
    country.languages
  ).join(', ')}</span></p></div>`;
  refs.countryInfo.innerHTML = countryDescription;
}

function createCountryList(countriesArray) {
  const listItemEl = countriesArray
    ?.map(country => {
      return `<li class="country-item">
      <img src="${country.flags.svg}" alt="Flag" width="30" height="20" />
      <span class="country-name">${country.name.official}</span>
    </li>`;
    })
    .join('');

  refs.countryList.innerHTML = listItemEl;
}
