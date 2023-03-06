const loadCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => displayCountries(data))
}

const displayCountries = (countries) => {
    const countriesContainer = document.getElementById('all-countries');
    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');
        countryDiv.innerHTML = `
        <img src="${country.flags.png}">
        <h4>Name: ${country.name.common}</h4>
        <p>Official Name: ${country.name.official}</p>
        <p>Capital: ${country.capital ? country.capital[0] : 'No Capital Found'}</p>
        <P>CCA2: ${country.cca2} </p>
        <P>Region: ${country.region} </p>
        <P>Sub Region: ${country.subregion} </p>
        <button onclick="loadCountriesDetails('${country.cca2}')">Details</button>
        <P>Coat Of Arms: ${country.coatOfArms.png?  '': 'Not Found'} </p>
        <img src="${country.coatOfArms.png? country.coatOfArms.png: ''}">
        `;
        countriesContainer.appendChild(countryDiv);
    });
}

const loadCountriesDetails = (code) => {
    const url = `https://restcountries.com/v3.1/alpha/${code}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountriesDetails(data[0]))
}

const displayCountriesDetails = (country) => {
    const countryDetails = document.getElementById('country-details');
    countryDetails.innerHTML = `
        <h3>Country: ${country.name.common} </h3>
        <P>Continents: ${country.continents} </p>
        <P>Borders: ${country.borders[0]} </p>
        <P>Landlocked: ${country.landlocked} </p>
        <P>Start Of Week: ${country.startOfWeek} </p>
        <P>Area: ${country.area} </p>
        <P>Population: ${country.population} </p>
        <P>Flag Alt: ${country.flags.alt} </p>
    `;
}

loadCountries()