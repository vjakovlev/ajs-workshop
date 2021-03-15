let restApiService = {
    url: "https://restcountries.eu/rest/v2/all",
    getCountries: function(countryName) {
        let countryUrl = `https://restcountries.eu/rest/v2/name/${countryName}`;
        $.ajax({
            url: countryUrl,
            success: function(response) {
                uiService.loadCountries(response);
            },
            error: function(response) {
                uiService.printError();
                console.warn("error has occured")
            },
            complete: function() {
                uiService.toggleLoader(false);
            }
        })
    }
}

let navigationService = {
    input : document.getElementById("input"),
    button : document.getElementById("searchButton"),
    registerListeners: function(){
        this.button.addEventListener("click", function(){
            uiService.toggleLoader(true);
            restApiService.getCountries(input.value);
        })
    }
}

let uiService = {
    result : document.getElementById("result"),
    loader: document.getElementById("loader"),
    loadCountries : function(data) {
        this.result.innerHTML = "";
        this.result.innerHTML += `
            <div class="row yellow padding">
                <div class="col-md-1"></div>
                <div class="col-md-1">Flag</div>
                <div class="col-md-1">Name</div>
                <div class="col-md-2">Population</div>
                <div class="col-md-1">Capital</div>
                <div class="col-md-1">Area</div>
                <div class="col-md-2">Languages</div>
                <div class="col-md-2">Currencies</div>
            </div><br>
        `;
        for (let country of data) {
            this.result.innerHTML += `
            <div class="row white padding">
                <div class="col-md-1"></div>
                <div class="col-md-1"><img src="${country.flag}" alt="flag" height="50px"></div>
                <div class="col-md-1">${country.name}</div>
                <div class="col-md-2 population">${country.population}</div>
                <div class="col-md-1">${country.capital}</div>
                <div class="col-md-1">${country.area} km²</div>
                <div class="col-md-2">${uiService.loadLanguages(country.languages)}</div>
                <div class="col-md-2">${uiService.loadCurrencies(country.currencies)}</div>
            </div>
            `;
        }
        console.log(document.getElementsByClassName("population")[1]);
    },
    loadLanguages: function(languages){
        let result = "";
        for (let language of languages){
            result += `${language.name}, `;
        }
        return result.slice(0, -2);
    },
    loadCurrencies: function(currencies){
        let result = "";
        for (let currency of currencies){
            result += `${currency.name}, `;
        }
        return result.slice(0, -2);
    },
    toggleLoader: function(toggle) {
        if (toggle) this.loader.style.display = "block";
        else this.loader.style.display = "none";
    },
    printError: function(){
        this.result.innerHTML = `<div class="col-md-12 red">Cannot find country</div>`
    }
}

navigationService.registerListeners();