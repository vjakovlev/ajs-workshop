let navigationService = {
    searchBar: document.getElementById(`searchBar`),
    searchBtn: document.getElementById(`searchBtn`),
    nameEng: document.getElementById(`nameEng`),
    nameDom: document.getElementById(`nameDom`),
    borders: document.getElementById(`borders`),
    flag: document.getElementById(`flag`),
    currencies: document.getElementById(`currencies`),
    languages: document.getElementById(`languages`),
    neighboursSearch: document.getElementsByClassName(`neighboursSearch`),
    searchBtnLang: document.getElementById(`searchBtnLang`),
    searchBarLang: document.getElementById(`searchBarLang`),
    contryName: document.getElementsByClassName(`contryName`),
    nameDirection: true,
    capitalDirection: true,
    populationSort: true,
    loader: false,

    registeredListeners: ()=> {
        navigationService.searchBtn.addEventListener(`click` , function(){
            
            apiService.getData(navigationService.searchBar.value)
         
            
        });
       
        navigationService.searchBtnLang.addEventListener(`click`, function(){
          
            apiService.getDataLanguage(navigationService.searchBarLang.value)
        });

      

    },
    contrySelect: ()=> {
        for(let i = 0; i <   navigationService.neighboursSearch.length; i++){
           
            navigationService.neighboursSearch[i].addEventListener(`click`, function(){
                apiService.getData(navigationService.neighboursSearch[i].innerText)
            })
        };
    },
    languageSelect: ()=> {
        for(let i = 0 ; i < navigationService.contryName.length; i++){
            navigationService.contryName[i].addEventListener(`click` , function(){
                apiService.getData(navigationService.contryName[i].name)
            })
        }
    }
}



let apiService ={
    url: `https://restcountries.eu/rest/v2/alpha/`,
    urlFullname: `https://restcountries.eu/rest/v2/name/`,
    getData: async (contry)=> {
        await uiService.loaderToggle()
        let call = await fetch(`${apiService.url}${contry}`) 
     
        if(call.status > 399 && call.status < 500){navigationService.searchBar.value = `no Such contry` }
        let data = await call.json();
       
        await uiService.printNames(data);
        await uiService.printNeighbors(data);
        await uiService.printFlag(data);
        await uiService.printCurrency(data);
        await uiService.printLanguages(data);
        navigationService.contrySelect()
        navigationService.languageSelect()
        await uiService.loaderToggle()
        
        
    },
    getDataLanguage: async (lang)=> {
        await uiService.loaderToggle()
        let call = await fetch(`https://restcountries.eu/rest/v2/lang/${lang}`);
        if(call.status > 399 && call.status < 500){navigationService.searchBarLang.value = `no Such Language` }
        let data = await call.json();

        await uiService.printContryLang(data)
        navigationService.contrySelect()
        navigationService.languageSelect()
        await uiService.loaderToggle()
    }
}
 let uiService = {
     loaderToggle: ()=> {
        if(navigationService.loader === false){
            navigationService.loader = true
            document.getElementById("loader1").innerHTML = `<img src="./img/loader.gif" width="20%" >`
            document.getElementById("loader2").innerHTML = `<img src="./img/loader.gif" width="20%" >`
        } else {
            navigationService.loader = false
            document.getElementById("loader1").innerHTML = ``
            document.getElementById("loader2").innerHTML = ``
        }
     },
    printNames: (data)=>{
        navigationService.nameEng.innerHTML = `${data.name}`
        if(data.altSpellings[2]){
            navigationService.nameDom.innerHTML = `${data.altSpellings[2]}`
            
        } else {navigationService.nameDom.innerHTML = ``}
    },
    printNeighbors: (data) => {
        navigationService.borders.innerHTML = `Borders`;
        for(neighbor of data.borders){
            navigationService.borders.innerHTML += `<br/> <a value="${neighbor}" href="#" class="neighboursSearch"> ${neighbor} </a> <br/>`
        }
    },
    printFlag: (data)=> {
        navigationService.flag.innerHTML = `<img src="${data.flag}" width="100%"> <br>
            <b>   Capital City: ${data.capital} </b>
        `
    },
    printCurrency: (data) => {
        navigationService.currencies.innerHTML = `
            <h4>Currency Name: </h4>
            <p> ${data.currencies[0].name} </p>
            <h4>Currency Code:</h4>
            <p> ${data.currencies[0].code} </p>
            <h4> Currency symbol: </h4>
            <p> ${data.currencies[0].symbol} </p>
        `
    },
    printLanguages: (data) => {
        navigationService.languages.innerHTML = ``
        for(language of data.languages)
        navigationService.languages.innerHTML += `<fieldset><legend>Language</legend><p> <b>Name: </b>${language.name} </p><p><b> Native Name: </b> ${language.nativeName} </p> </fieldset>`
    },
    printContryLang: (data)=> {
        document.getElementById(`container`).innerHTML = `<div class="row">
        <div class="col-md-1" > Flag </div>
        <div class="col-md-4" id="sortName">Name</div>
        <div class="col-md-4" id="sortCapital">Capital</div>
        <div class="col-md-3" id="sortPopulation">Population</div>
    </div>`
        data.map(contry => {
            document.getElementById(`container`).innerHTML += `
            <div class="row">
                <div class="col-md-1"><img src="${contry.flag}"  width="60%" ></div>
                <div class="col-md-4"><a name="${contry.alpha3Code}" href="#" class="contryName">${contry.name} </a></div>
                <div class="col-md-4" >${contry.capital}</div>
                <div class="col-md-3" >${contry.population}</div>
            </div>
            `
        })
        document.getElementById(`sortName`).addEventListener(`click` , function(){
            
            if(navigationService.nameDirection === false){
                data.sort((a,b) => {
                    navigationService.nameDirection = true;
                   if(a.name < b.name) return -1;
                   
               });
            } else if (navigationService.nameDirection === true){
                data.sort((a,b) => {
                    navigationService.nameDirection = false;
                    if(a.name > b.name) return -1; 
            });
        }
        uiService.printContryLang(data)
        });
        document.getElementById(`sortCapital`).addEventListener(`click` , function(){
         
            if(navigationService.capitalDirection === false){
                data.sort((a,b) => {
                    navigationService.capitalDirection = true;
                   if(a.capital < b.capital) return -1;
                   
               });
            } else if (navigationService.capitalDirection === true){
                data.sort((a,b) => {
                    navigationService.capitalDirection = false;
                    if(a.capital > b.capital) return -1; 
            });
        }
        uiService.printContryLang(data)
        });
        document.getElementById(`sortPopulation`).addEventListener(`click` , function(){
         console.log(`clicked`)
            if(navigationService.populationSort === false){
                data.sort((a ,b) => {
                    navigationService.populationSort = true;
                    return a.population - b.population;
                   
               });
            } else if (navigationService.populationSort === true){
                data.sort((a,b) => {
                    navigationService.populationSort = false;
                    return b.population - a.population; 
            });
        }
        uiService.printContryLang(data)
        });
        
    },
    
 }


apiService.getData(`mkd`)

navigationService.registeredListeners()
