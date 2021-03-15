const navService = {
    searchInput: document.getElementById("searchInput"),
    searchBtn: document.getElementById("searchBtn"),

    registerEventListeners: function(){
        this.searchBtn.addEventListener('click', ()=>{
            uiService.toggleLoader(true);
            event.preventDefault();
            countriesService.county = this.searchInput.value;
            countriesService.apiCallAsync();
            this.searchInput.value="";
        })
    },

    toggleLoader: function(){

    }
}


const countriesService = {
    url: "https://restcountries.eu/rest/v2/name/",
    county: "Macedonia",

    apiCallAsync: async function(){
        try{
            uiService.toggleLoader(true);
            let data = await fetch(`${this.url}${this.county}`);
            let response = await data.json();

            uiService.printResults(await response);
            sortingService.registerSortListeners(await response);
        }
        catch{
            console.log('An error has occured!');
        }
        finally{
            uiService.toggleLoader(false);
        }
    }
}


const uiService = {
    tableResult: document.getElementById("tableResult"),
    loader: document.getElementById("loader"),

    printResults: function(data){
        this.tableResult.innerHTML="";

        data.forEach(country => {
            this.tableResult.innerHTML+=`
            <div class="row table">
                <div class="col-md-2"><img src="${country.flag}" height="100px"></div>
                <div class="col-md-2">${country.name}</div>
                <div class="col-md-2">${country.population}</div>
                <div class="col-md-2">${country.capital}</div>
                <div class="col-md-2">${country.area}</div>
                <div class="col-md-1">${country.languages[0].name}</div>
                <div class="col-md-1">${country.currencies[0].name}</div>
            </div>
            `;
        });

    },

    toggleLoader: function(flag){
        if(flag) this.loader.style.display = "block";
        else this.loader.style.display = "none";
    }
}


const sortingService = {
    name: document.getElementById("name"),
    population: document.getElementById("population"),
    area: document.getElementById("area"),
    nameFlag: false,
    populationFlag: false,
    areaFlag: false,

    registerSortListeners: function(data) {
        sortingService.name.addEventListener('click', ()=>{
            if(this.nameFlag === false){
                this.nameFlag=true;
                let sortedArray = data.sort((a, b) => {
                    if(a.name > b.name){return -1}
                    else{return 1}
                });
                uiService.printResults(sortedArray);
            }else{
                this.nameFlag=false;
                let sortedArray = data.sort((a, b) => {
                    if(a.name > b.name){return 1}
                    else{return -1}
                });
                uiService.printResults(sortedArray);
            }

        });

        sortingService.population.addEventListener('click', ()=>{
            if(sortingService.populationFlag === false){
                sortingService.populationFlag = true;
                let sortedArray = data.sort((a, b) => (a.population > b.population))
                uiService.printResults(sortedArray);
            }else{
                let sortedArray = data.sort((a, b) => (a.population < b.population))
                uiService.printResults(sortedArray);
                sortingService.populationFlag = false;
            }
        });

        sortingService.area.addEventListener('click', ()=>{
            if(sortingService.areaFlag === false){
                sortingService.areaFlag = true;
                let sortedArray = data.sort((a, b) => (a.area > b.area))
                uiService.printResults(sortedArray);
            }else{
                let sortedArray = data.sort((a, b) => (a.area < b.area))
                uiService.printResults(sortedArray);
                sortingService.areaFlag = false;
            }
        })
    }

}


countriesService.apiCallAsync();
navService.registerEventListeners();
