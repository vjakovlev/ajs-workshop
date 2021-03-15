let navService = {
    searchInput: document.getElementById("countrySearchInput"),
    searchBtn: document.getElementById("countrySearchBtn"),
    registerEventListeners: function(){
        this.searchBtn.addEventListener('click', function(event){
            event.preventDefault();
            countryService.country = navService.searchInput.value;
            countryService.dataAsync();
            this.searchInput.value="";
        })
    },

}


let countryService = {
    url: "https://restcountries.eu/rest/v2/name/",
    country: "Sweden",

    dataAsync: async function(){
        try{
            
            let data = await fetch(`${this.url}${this.country}`);
            let response = await data.json();
            console.log(response);

            uiService.displayResults(await response);
            
        }
        catch{
            console.log('Error');
        }
        
    }
}

countryService.dataAsync();
let uiService = {
    tableResult: document.getElementById("tableResult"),
   

    displayResults: function(data){
        this.tableResult.innerHTML="";

        data.forEach(country => {
            this.tableResult.innerHTML+=`
            <div class="row table">
                <div class="col-md-2"><img src="${country.flag}" height="100px"></div>
                <div class="col-md-2">${country.name}</div>
                <div class="col-md-2">${country.population}</div>
                <div class="col-md-2">${country.capital}</div>
                <div class="col-md-2">${country.area}</div>
            </div>
            `;
        });

    },
}




countryService.dataAsync();
navService.registerEventListeners();


