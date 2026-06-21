var API_URL = "https://autosuggest-backend.onrender.com/api/autosuggest";

var searchBar = document.getElementById("autosuggest");
var suggestionsContainer = document.getElementById("search-suggestions");
var pill = document.getElementById("status-pill");

var currentIndex = -1;

searchBar.addEventListener("input", function(){

    var query = searchBar.value.trim();

    currentIndex = -1;

    if(query === ""){
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.style.display = "none";
        return;
    }

    fetchSuggestions(query);
});

function fetchSuggestions(query){

    suggestionsContainer.style.display = "block";

    suggestionsContainer.innerHTML =
        "<div class='loading'>⌛ Searching...</div>";

    var start = performance.now();

    var fullAPI =
        API_URL +
        "?q=" + encodeURIComponent(query) +
        "&weighted=true&algorithm=trie&limit=8";

    fetch(fullAPI)
        .then(function(res){
            return res.json();
        })
        .then(function(data){

            var end = performance.now();

            pill.innerHTML =
                "&#x2022; online | &#x23F0; " +
                Math.round(end - start) +
                " ms";

            showSuggestions(data);
        })
        .catch(function(error){

            console.log(error);

            suggestionsContainer.innerHTML =
                "<div class='no-result'>Error fetching suggestions</div>";
        });
}

function showSuggestions(data){

    var values = data.results;

    if(data.count === 0){

        suggestionsContainer.innerHTML =
            "<div class='no-result'>No suggestions found</div>";

        return;
    }

    var html = "";

    for(var i=0;i<values.length;i++){

        html +=
            "<div class='suggestion-row'>" +

                "<span class='suggestion-item'>" +
                    values[i].text +
                "</span>" +

                "<span class='suggestion-weight'>" +
                    values[i].weight +
                "</span>" +

            "</div>";
    }

    suggestionsContainer.innerHTML = html;

    addClickEvents();
}

function addClickEvents(){

    var rows = document.querySelectorAll(".suggestion-row");

    rows.forEach(function(row){

        row.addEventListener("click", function(){

            searchBar.value =
                row.querySelector(".suggestion-item").innerText;

            suggestionsContainer.style.display = "none";
        });
    });
}

searchBar.addEventListener("keydown", function(e){

    var rows = document.querySelectorAll(".suggestion-row");

    if(rows.length === 0) return;

    if(e.key === "ArrowDown"){

        e.preventDefault();

        currentIndex++;

        if(currentIndex >= rows.length){
            currentIndex = 0;
        }

        updateActive(rows);
    }

    else if(e.key === "ArrowUp"){

        e.preventDefault();

        currentIndex--;

        if(currentIndex < 0){
            currentIndex = rows.length - 1;
        }

        updateActive(rows);
    }

    else if(e.key === "Enter"){

        if(currentIndex > -1){

            e.preventDefault();

            rows[currentIndex].click();
        }
    }
});

function updateActive(rows){

    rows.forEach(function(row){
        row.classList.remove("active");
    });

    rows[currentIndex].classList.add("active");
}

document.addEventListener("click", function(e){

    if(
        !searchBar.contains(e.target) &&
        !suggestionsContainer.contains(e.target)
    ){
        suggestionsContainer.style.display = "none";
    }
});

document.getElementById("theme-toggle")
.addEventListener("click", function(){

    document.body.classList.toggle("dark");
});