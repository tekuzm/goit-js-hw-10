import './css/styles.css';
import debounce from 'lodash.debounce';
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

function inputChangeHandler(event) {
  const name = this.value;

  if (!name) {
    clearCountryList();
    return;
  }

  fetchCountries(name)
    .then(countriesArray => {
      clearCountryList();

      if ((countriesArray.length = 1)) {
        createCountryCard();
      }

      countriesArray.forEach(country => {
        const listItemEl = document.createElement('li');
        const countryName = country.name.common;
        listItemEl.innerHTML = countryName;
        refs.countryList.appendChild(listItemEl);
      });
    })
    .catch(error => {
      return error;
    });
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}

function createCountryCard() {
  clearCountryList();
  refs.countryInfo.innerHTML += `<div class="country-card"><div class="country-header"><img src="${flags.svg}" class="flag-img" alt="Flag" width=55 height=35><h2 class="country-name">${name}</h2></div><p class="country-description">Capital: <span class="country-description--value">${capital}</span></p><p class="country-description">Population: <span class="country-description--value">${population}</span></p><p class="country-description">Languages: <span class="country-description--value">${languages}</span></p></div>`;
}
