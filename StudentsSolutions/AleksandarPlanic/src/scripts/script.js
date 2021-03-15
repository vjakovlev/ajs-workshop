let navService = {
    navItems: document.getElementsByClassName("nav-item"),
    navSearch: document.getElementById("searchInput"),
    ascSortName: document.getElementById("ascName"),
    descSortName: document.getElementById("descName"),
    pages: document.getElementById("pages").children,
    activateItem: function(item){
        for(let navItem of this.navItems) {
            navItem.classList.remove("active");
        }
        item.classList.add("active");
    },
    showPage: function(page){
        for(let pageElement of this.pages) {
            pageElement.style.display = "none";
        }
        page.style.display = "block";
    },
    registerNavListeners: function() {
        for(let i = 0; i < this.navItems.length; i++){
            this.navItems[i].addEventListener("click", function(){
                navService.activateItem(this);
                navService.showPage(navService.pages[i]);
            })
        }

        navService.navSearch.addEventListener("keyup", (input) => {
            let searchCountry = input.target.value;
            let filterCountry = apiService.cachedData.filter((country) => {
                return (
                    country.name.toLowerCase().includes(searchCountry.toLowerCase())
                );
            })
            uiService.renderCountries(filterCountry);
        })

        navService.ascSortName.addEventListener("click", () => {
            let ascName = apiService.cachedData.sort((a,b) => {if(a.name.toLowerCase() < b.name.toLowerCase()) return -1});
            uiService.renderCountries(ascName)
        })
        navService.descSortName.addEventListener("click", () => {
            let descName = apiService.cachedData.sort((a,b) => {if(a.name.toLowerCase() > b.name.toLowerCase()) return -1});
            uiService.renderCountries(descName)
        })
    }
}

let apiService = {
    url: "https://restcountries.eu/rest/v2/all",
    cachedData: null,
    loadCountries: async function(){
        try{
            let result = await fetch(this.url);
            apiService.cachedData = await result.json();
            console.log(apiService.cachedData)
            uiService.renderCountries(this.cachedData)
        } catch (error){
            console.log(error);
        }

    }
}

let uiService = {
    tableContent: document.getElementById("content"),
    renderCountries: countries => {
            uiService.tableContent.innerHTML = "";
        countries.forEach((country, index) => {
            uiService.tableContent.innerHTML += `
                <tr>
                    <td>${++index}</td>
                    <td><img src="${country.flag}" width="50" height="50" alt="${country.name}"></td>
                    <td>${country.name}</td>
                    <td>${country.population}</td>
                    <td>${country.capital}</td>
                    <td>${country.area}</td>
                <tr>
            `;
        })
    }

}

navService.registerNavListeners()
apiService.loadCountries()