let ip = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppend(result) {
    let {
        title,
        link,
        description
    } = result;
    let res = document.createElement("div");
    res.classList.add("result-item");
    searchResults.appendChild(res);
    let title1 = document.createElement("a");
    title1.classList.add("result-title");
    title1.textContent = title;
    title1.href = link;
    title1.target = "_blank";
    res.appendChild(title1);
    let br1 = document.createElement("br");
    res.appendChild(br1);
    let url1 = document.createElement("a");
    url1.textContent = link;
    url1.href = link;
    url1.target = "_blank";
    res.appendChild(url1);
    let br = document.createElement("br");
    res.appendChild(br);
    let des = document.createElement("p");
    des.textContent = description;
    des.classList.add("line-description");
    res.appendChild(des)


}

function display(searchResults) {
    spinner.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppend(result);
    }
}

function search(event) {
    let search = ip.value;
    if (event.key === "Enter") {
        searchResults.textContent = "";

        if (search.trim() === "") {

            let p1 = document.createElement("p");
            p1.textContent = "Enter Valid Text";
            p1.classList.add("er");
            searchResults.appendChild(p1);
        } else if (search.trim() !== "") {
            spinner.classList.toggle("d-none");
            let url = "https://apis.ccbp.in/wiki-search?search=" + search;
            let options = {
                method: "GET"
            }
            fetch(url, options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsondata) {
                    let {
                        search_results
                    } = jsondata;
                    if (search_results.length === 0) {
                        spinner.classList.toggle("d-none");
                        let p1 = document.createElement("p");
                        p1.textContent = "No Results Found";
                        p1.classList.add("er");
                        searchResults.appendChild(p1);
                    } else {
                        display(search_results)
                    }
                })
        }
    }

}
ip.addEventListener("keydown", search);
