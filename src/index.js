import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';

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

  // якщо поле інпут пусте, очищуй результати пошуку
  if (!name) {
    clearResults();
    return;
  }

  fetchCountries(name)
    .then(countriesArray => {
      clearResults();

      // якщо 1 країна у результатах пошуку, то створюй картку країни
      if (countriesArray.length < 2) {
        createCountryCard(countriesArray);
      } else if (countriesArray.length >= 2 && countriesArray.length <= 10) {
        // якщо від 2 до 10 країн у результатах пошуку, то показуй список країн
        createCountryList(countriesArray);
      } else {
        // якщо більше 10 країн у результатах пошуку, показуй alert
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

function createCountryCard(countryObj) {
  const country = countryObj[0];
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
  const listItemEl = countriesArray.forEach(country => {
    `<li class="country-item"><img src="${country.flags.svg}" alt="Flag" width="30", height="20"><span class="country-name">${country.name.official}</span></li>`;
    refs.countryList.innerHTML = listItemEl;
  });
}
