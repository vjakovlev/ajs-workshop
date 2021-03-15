let countryService = {
    nameInput: document.getElementById('nameInput'),
    searchBtn: document.getElementById('searchBtn'),
    table: document.getElementById('tableResults'),
    loader: document.getElementById('loader'),

    name: document.getElementById('name'),
    population: document.getElementById('population'),
    area: document.getElementById('area'),

    
    getDataAsync: async function (countryName) {
        cachedData: null;
        let response = await fetch(`
        https://restcountries.eu/rest/v2/name/${countryName}`);
        let data = await response.json();
        countryService.cachedData = data;
        console.log(countryService.cachedData);
        countryService.toggleLoader(false)
        countryService.inputInTable(countryService.cachedData);

        this.searchBtn.addEventListener('click', function (){
            countryService.toggleLoader(true);
            countryService.getDataAsync(countryService.nameInput.value);
        })
        this.name.addEventListener('click', function (){
            countryService.getSortedData(countryService.name.value)
        })
        this.population.addEventListener('click', function (){
            countryService.getSortedData(countryService.population.value)
        })
        this.area.addEventListener('click', function (){
            countryService.getSortedData(countryService.area.value)
        })

       
    },
    getSortedData: function(el) {

        let sortedArray = countryService.cachedData.el.sort((a, b) => (a.weather[0].description > b.weather[0].description ? 1 : -1))
        countryService.inputInTable(sortedArray);

    },


    inputInTable: function (data){

        for (let i = 0; i < data.length; i++) {

            countryService.table.innerHTML += `
            <tr>
                <td> <img class="country__img" src="${data[i].flag}" /> </td>
                <td>${data[i].name}</td>
                <td>${(+data[i].population/1000000).toFixed(1)} - Million people</td>
                <td>${data[i].capital}</td>
                <td>${data[i].area}</td>
                <td>${data[i].languages[0].name}</td>
                <td>${data[i].currencies[0].name}</td>

            </tr> 
            `;
        }
    },

    toggleLoader: function(toggle) {
        if (toggle) this.loader.style.display = "block";
        else this.loader.style.display = "none";
    },


    
}


countryService.getDataAsync("Macedon");
