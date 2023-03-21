let searchBtn = document.getElementById('search-btn');
let countryInp = document.getElementById('country-inp');
searchBtn.addEventListener('click', () => {
  let countryName = countryInp.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  //   console.log(finalURL);
  let covidData = [];
  let deaths = '';
  let confirmed = '';
  let newConfirmed = '';
  let newDeath = '';

  const loadData = async () => {
    try {
      let covidUrl = await fetch('https://api.covid19api.com/summary');
      covidData = await covidUrl.json();
      let covidData2 = covidData.Countries;
      for (let x in covidData2) {
        if (covidData2[x].Country == countryName) {
          deaths = covidData2[x].TotalDeaths;
          newDeath = covidData2[x].NewDeaths;
          confirmed = covidData2[x].TotalConfirmed;
          newConfirmed = covidData2[x].NewConfirmed;
        }
      }
      //   console.log(deaths);

      fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
          result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages).toString().split(',').join(', ')}</span>
            </div>
        </div>
        <br>
        <hr>
        <br>
        <h2>Covid-19 In ${data[0].name.common}</h2>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Confirmeds:</h4>
                <span>${confirmed}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>New Confirmed:</h4>
                <span>${newConfirmed}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Deaths:</h4>
                <span>${deaths}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>New Death:</h4>
                <span>${newDeath}</span>
            </div>
        </div>
        
        <button class="search-btn" type="submit" id="refresh" name="refresh" value="Refresh Page" method="post" onClick="window.location.reload();">Back</button> 
      `;
        })
        .catch(() => {
          if (countryName.length == 0) {
            result.innerHTML = `<h3>The input field cannot be empty</h3>`;
          } else {
            result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  loadData();
});
