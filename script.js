document.addEventListener("DOMContentLoaded", () => {
    const countriesList = document.querySelector("#countriesList");
    const searchForm = document.querySelector("#search-form");
    const inputCountry = document.querySelector("#input-country");
    
// creating global variable

    let countriesData;

// fetch request to RESTCountries API

    const fetchCountriesData = async () => {
        return await fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json());
    }

// creating SetUp() function

    const setUp = async () => {
        countriesData = await fetchCountriesData();
        populatingListWithCountries(countriesData);
    }

    setUp();

// populating countries list

    const populatingListWithCountries = (countries) => {
        countriesList.innerHTML = ''; // Clear the list
        countries.forEach((country) => {
            const listItem = document.createElement("li");
            listItem.textContent = country.name.common;
            countriesList.appendChild(listItem);
        })
    }

// filter

    const filterAndPopulateList = (filterValue) => {
        const filteredCountries = countriesData.filter(country => 
            country.name.common.toLowerCase().includes(filterValue.toLowerCase())
        );

        countriesList.innerHTML = ''; 
        populatingListWithCountries(filteredCountries);
    }

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputValue = inputCountry.value;
        filterAndPopulateList(inputValue);
    });
});
