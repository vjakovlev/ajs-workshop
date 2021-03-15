let navigationService = {
    navItems: document.getElementsByClassName("nav-item"),
    navCountrySearchInput: document.getElementById("countrySearchInput"),
    navCountrySearchButton: document.getElementById("countrySearchButton"),
    pages: document.getElementById("pages").children,
    pageLimit: false,
    month: "",
    minutes: "",
    clicksPerMinute: 0,
    clicksPerMonth: 0,
    apiClicks: function(){
        if (this.clicksPerMinute < 59 && this.minutes === new Date().getMinutes() && this.clicksPerMonth < 1000000
            && this.month === new Date().getMonth()) {
            navigationService.clicksPerMinute++
            navigationService.clicksPerMonth++
            console.log(navigationService.clicksPerMinute)
            console.log(navigationService.clicksPerMonth)
            return navigationService.pageLimit = true
        }
        else if (this.minutes !== new Date().getMinutes() && this.month !== new Date().getMonth()) {
            navigationService.month = new Date().getMonth()
            navigationService.minutes = new Date().getMinutes()
            navigationService.clicksPerMinute = 0;
            navigationService.clicksPerMonth = 0;
            return navigationService.pageLimit = true
        }
        else {
            return navigationService.pageLimit = false
        }
    },
    activateItem: (item) => {
        for (let navItem of navigationService.navItems) {
            navItem.classList.remove("active")
        }
        item.classList.add("active")
    },
    showPage: (page) => {
        for (let pageElement of navigationService.pages) {
            pageElement.style.display = "none"
        }
        page.style.display = "block"
    },
    registerNavListeners: () => {
        for (let i = 0; i < navigationService.navItems.length; i++) {
            navigationService.navItems[i].addEventListener("click", function() {
                navigationService.activateItem(this)
                navigationService.showPage(navigationService.pages[i])
            })
        }
        navigationService.navCountrySearchButton.addEventListener("click", (event) => {
            event.preventDefault()
            countryApiService.code = navigationService.navCountrySearchInput.value
            navigationService.apiClicks()
            uiService.toggleLoader(true)
            if (navigationService.pageLimit === true) {
                countryApiService.getCountryDataAsync()
            }
            else {
                uiService.toggleLoader(false)
            }
        })
    }
}

let countryApiService = {
    apiUrl: "https://restcountries.eu/",
    code: "MKD",
    countryData: [],
    getCountryDataAsync: async function () {
        try {
            let result = await fetch(`${countryApiService.apiUrl}rest/v2/alpha/${countryApiService.code}`)
            countryApiService.countryData = await result.json();
            console.log(countryApiService.countryData)
            uiService.toggleLoader(false);
            uiService.loadCountryData(countryApiService.countryData);
        }
        catch {
            console.log(`Error`)
        }
    }
}

let uiService = {
    tableResult: document.getElementById("tableResult"),
    countryList: 0,
    countryPerPage: 9,
    page: 1,
    pages: 0,
    loader: document.getElementById("loader"),
    loadCountryData: data => {
        for(let country of data) {
            uiService.tableResult.innerHTML = ""
            uiService.tableResult.innerHTML = `
                <div class="row">
                    <div class="col-md-2"><img src= "${country.flag}" width="40" height="40" "></div>   
                    <div class="col-md-2>${country.name}</div>
                    <div class="col-md-2>${country.population}</div>
                    <div class="col-md-2>${country.capital}</div>
                    <div class="col-md-4>${country.area}</div>
                </div>
            `;
        }
        document.getElementById("previous").style.display = "none";
        document.getElementById("previous").addEventListener("click", function(){
            uiService.countryList = uiService.countryList - 10;
            uiService.countryPerPage = uiService.countryPerPage -10;
            uiService.page--
            uiService.loadCountryData(data)
            if(uiService.page <= 1){
                document.getElementById("previous").style.display = "none";
            }
            else{
                document.getElementById("previous").style.display = "block"
            }
            if(uiService.page === Math.ceil(pages)){
                document.getElementById("next").style.display = "none";
            }
            else{
                document.getElementById("next").style.display = "block"
            }
        })
        document.getElementById("next").addEventListener("click", function(){
            uiService.countryList = uiService.countryList + 10;
            uiService.countryPerPage = uiService.countryPerPage + 10;
            uiService.page++
            uiService.loadCountryData(data)
            if(uiService.page <= 1){
                document.getElementById("previous").style.display = "none";
            }
            else{
                document.getElementById("previous").style.display = "block"
            }
            if(uiService.page === Math.ceil(pages)){
                document.getElementById("next").style.display = "none";
            }
            else{
                document.getElementById("next").style.display = "block"
            }
        })
    },
    toggleLoader: (toggle) => {
        if(toggle) uiService.loader.style.display = "block";
        else uiService.loader.style.display = "none";
    }

}



navigationService.registerNavListeners();
// countryApiService.getCountryDataAsync();