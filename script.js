fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        // Filter countries from Asia
        const asianCountries = countries.filter(country => country.region?.includes('Asia'));

        const usDollarCountries = countries.filter(country =>
            country.currencies ? country.currencies.hasOwnProperty('USD') : false
        );
        const usDollarList = document.getElementById('usDollarList');
    usDollarCountries.forEach(country => {
        const listItem = document.createElement('li');
        listItem.textContent = `Country using US dollars: ${country.name.common}`;
        usDollarList.appendChild(listItem);
    });

        // Calculate the total population of Asian countries using reduce
            const totalPopulation = asianCountries.reduce((acc, country) => {
            const populationData = country.population || country.population_density;


            // Extracting population based on available structure in the API
            const population = populationData ? populationData.total || populationData : 0;

            return acc + population;
        }, 0);

        // Display the total population
        const totalPopulationElement = document.getElementById('totalPopulation');
        totalPopulationElement.textContent = `Total Population of Asian Countries: ${totalPopulation.toLocaleString()}`;

        // Filter countries with a population of less than 2 lakh (200,000)
        const lessThan2LakhCountries = countries.filter(country => country.population < 200000);

        // Display the list of Asian countries
        const countryList = document.getElementById('countryList');
        asianCountries.forEach(country => {
            const listItem = document.createElement('li');
            listItem.textContent = `Asia: ${country.name.common}`;
            listItem.innerHTML = `
            <strong>Name:</strong> ${country.name.common}<br>
            <strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}<br>
            <strong>Flag:</strong> <img src="${country.flags?.png}" alt="Flag" width="20" height="15">
        `;
            document.body.appendChild(listItem);
        });
        

        // Display the list of countries with population less than 2 lakh
        const lessThan2LakhList = document.getElementById('lessThan2LakhList');
        lessThan2LakhCountries.forEach(country => {
            const listItem = document.createElement('li');
            listItem.textContent = `< 2 Lakh: ${country.name.common}`;
           document.body.appendChild(listItem);
        });
    })
    //Display the countries that use US dollars as currency


    
    .catch(error => console.error('Error fetching data:', error));