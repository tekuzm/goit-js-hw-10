export default function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error!`);
    })
    .then(data => {
      return data;
    });
}

// якщо 1 країна у результатах пошуку, то до url + ?fields=name,capital,population,flags,languages
