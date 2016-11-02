/*
I can click a button to see a random Wikipedia entry.
*/
var lang = "en";
var wikiurl = "http://" + lang + ".wikipedia.org";

function getRandomWiki() {
  $.ajax({
    type: "GET",
    url: wikiurl + "/w/api.php?action=query&format=json&prop=extracts&generator=random&grnnamespace=0&exchars=400&callback=?",
    contentType: "application/json; charset=utf-8",
    async: false,
    format: "json",
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      var pages = data.query.pages;
      var i = 0;
      var innerDiv = "";
      for (var page in pages) {
        var title = "<h2>" + pages[page].title + "</h2>";
        var extract = "<p>" + pages[page].extract + "</p>";
        var link = '<a href="' + wikiurl + '/wiki/'+ pages[page].title +
            '" target="_blank">To be continued here!</a>';
        innerDiv += "<div>" + title + extract + link + "</div>";
      }      
      $("#div-articles").html(innerDiv);
    },
    error: function(errorMessage) {
      console.log(errorMessage);
    }
  });
}

/*
 I can search Wikipedia entries in a search box and see the resulting Wikipedia entries.
*/
function getSearchWiki(searchText) {
  $.ajax({
    type: "GET",
    url: wikiurl + "/w/api.php?action=query&format=json&prop=extracts&&exlimit=max&explaintext&exintro&generator=search&exchars=200&gsrsearch=" + searchText + "&callback=?",
    contentType: "application/json; charset=utf-8",
    async: false,
    format: "json",
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      var pages = data.query.pages;
      var i = 0;
      var innerDiv = "";
      for (var page in pages) {
        var row = "";
        if(i % 3 === 0) {
          row ='<div class="row">';
        }
        
        i++;
        var title = "<h2>" + pages[page].title + "</h2>";
        var extract = "<p>" +  pages[page].extract + "</p>";
        var link = '<a href="' + wikiurl + '/wiki/'+ pages[page].title +
            '" target="_blank">To be continued here!</a>';
        innerDiv += row + '<div class="col-md-4 col-xs-6">' + title + extract + link + "</div>";
        
        if((i - 3) % 3 === 0) {
          innerDiv += "</div>";
        }
      }
      
      console.log(innerDiv);
      
      $("#div-articles").html(innerDiv);
    },
    error: function(errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).ready(function() {
  $("#random-button").click(getRandomWiki);
  $("#search-wiki-form").submit(function(event) {
    event.preventDefault();
    var searchText = document.forms["search-wiki-form"]["search-text"].value;
    getSearchWiki(searchText);
  });
});