const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset')


function resetForm() {
    document.getElementById("searchInput").value = "";
}
btnReset.addEventListener('click',resetForm);


function searchInput() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let resultsFound = false;
  
        if (input === 'beach' || input === 'beaches') {
          data.beaches.forEach(beach => {
            resultDiv.innerHTML += `
              <div>
                <img src= "${beach.imageUrl} " alt="hjh">
                <h3>${beach.name}</h3>
                <p>${beach.description}</p>
              </div>`;
          });
          resultsFound = true;
        }
  
        else if (input === 'temple' || input === 'temples') {
          data.temples.forEach(temple => {
            resultDiv.innerHTML += `
              <div>
                <img src= "${temple.imageUrl} " alt="hjh">
                <h3>${temple.name}</h3>
                <p>${temple.description}</p>
              </div>`;
          });
          resultsFound = true;
        }
  
        else {
          const matchedCountry = data.countries.find(country =>
            country.name.toLowerCase() === input
          );
  
          if (matchedCountry) {
            resultDiv.innerHTML += `<h3>Country: ${matchedCountry.name}</h3>`;
            matchedCountry.cities.forEach(city => {
              resultDiv.innerHTML += `
                <div>
                  <img src= "${city.imageUrl} " alt="hjh">
                  <h3>${city.name}</h3>
                  <p>${city.description}</p>
                </div>`;
            });
            resultsFound = true;
          }
        }
  
        if (!resultsFound) {
          resultDiv.innerHTML = 'No matching results found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
  
  btnSearch.addEventListener('click', searchInput);