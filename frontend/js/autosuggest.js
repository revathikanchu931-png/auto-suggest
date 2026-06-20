
//https://autosuggest-backend.onrender.com/api/autosuggest?q=a&weighted=true&algorithm=trie&limit=8
 var API_URL = "https://autosuggest-backend.onrender.com/api/autosuggest";

 var searchBar = document.getElementById("autosuggest");
 var suggestionsContainer = document.getElementById("search-suggestions");

 searchBar.addEventListener("input", function() {
    //get user tyed data
    //use user typed data in the query parameter of the API_URL
    //API CALL
    //append all the fetched data to the suggestionsContainer
     var query = searchBar.value.trim();
    //console.log("query", query);
     fetchSuggestions(query);
});

                function fetchSuggestions(query) {
                    var fullAPI = API_URL + "?q=" + query + "&weighted=true&algorithm=trie&limit=8";
                    fetch(fullAPI)
                        .then(function(res) {
                            return res.json();
                        })
                        .then(function(data) {
                           //onsole.log("data", data);
                            showSuggestions(data);
                        })
                        .catch(function(error) {
                            console.log("Error fetching suggestions:", error);
                        });
                    }

                    function showSuggestions(data) {
                        var values = data.results;
                        if(data.count === 0) {
                            suggestionsContainer.innerHTML = "<div>No suggestions found</div>";
                        } else {
                            var htmlstring = "";
                           for (var i = 0; i < values.length; i++) {
                                htmlstring += "<div><span class='suggestion-item'>" + values[i].text + "</span><span class='suggestion-weight'>&#x2022; " + values[i].weight + "</span></div>";
                            } 
                            suggestionsContainer.innerHTML = htmlstring;
                        }
                    }