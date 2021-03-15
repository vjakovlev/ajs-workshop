

let restCountriesApi = {
    cachedData: null,
    getAllData : () => {
        fetch("https://restcountries.eu/rest/v2/all")
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                printTableService.helperLoader(true)
                printTableService.tableData(data);
            }) 
    },
}

let printTableService = {
    th : document.getElementById("th"),
    tbody : document.getElementById("tbody"),
    searchInput : document.getElementById("search"),
    btn : document.getElementById("btn"),
    loader : document.getElementById("loader"),
    search : "",

    tableData: (data) => {
        printTableService.th.innerHTML = `
        <th>Flag</th>
        <th>Name</th>
        <th>Population</th>
        <th>Capital</th>
        <th>Area</th>
       
        `;
        for (let countri of data) {
                printTableService.tbody.innerHTML += `
            <tr> 
                <td><img style=" display:block;  width: 100px; "src="${countri.flag}"></td>
                <td>${countri.name}</td>
                <td>${countri.population}</td>
                <td>${countri.capital}</td>
                <td>${countri.area}</td>
            </tr>
            `;
            }
            printTableService.helperLoader(false)
            printTableService.btn.addEventListener("click", () => {
                printTableService.search = printTableService.searchInput.value;
                console.log(printTableService.search)
                for (let names of data) {
                    if(names.name === printTableService.search) {
                        printTableService.tbody.innerHTML = "";
                        printTableService.tbody.innerHTML += `
                        <tr> 
                            <td><img style=" display:block;  width: 100px; "src="${names.flag}"></td>
                            <td>${names.name}</td>
                            <td>${names.population}</td>
                            <td>${names.capital}</td>
                            <td>${names.area}</td>
                        </tr>
                        `
                    }
                }
             });
             // SORTING ne uspeav da pristapam kako sto treba
             document.getElementById("des").addEventListener("click", () => {
                 
                printTableService.helperLoader(true)
                console.log("sada")
                    data = data.sort((f, s) => {
                        if(f.capital < s.capital) return -1;
                        else if(f.capital > s.capital) return 1;
                        return 0;
                    });
                    console.log(data)
               printTableService.tableData(data);
            })
            // SORTING ne uspeav da pristapam kako sto treba
            document.getElementById("des").addEventListener("click", () => {
                printTableService.helperLoader(true)
                    data = data.sort((f, s) => {
                        if(f.population > s.population) return -1;
                        else if(f.population < s.population) return 1;
                        return 0;
                    });
                    
               printTableService.tableData(data);
            })
        },

        helperLoader : (toggle) => {
            if(toggle) printTableService.loader.style.display ="block";
            else printTableService.loader.style.display ="none";
        }
    }


restCountriesApi.getAllData()

