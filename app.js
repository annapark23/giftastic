
var animalArray = ["cat", "dog", "bird", "skunk", "hamster", "husky", "elephant", "turtle", "chicken","bear","moose", "fish","pig"];

function displayMovieInfo() {
    var gif = $(this).attr("data-gif");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div for the gif
              var gifDiv = $("<div>");
              // Storing the result item's rating
              var rating = results[i].rating;
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);
              // Creating an image tag
              var personImage = $("<img>");
              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);
              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);
              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gif-view").prepend(gifDiv);
            }
          }
    });    
  }

  function renderButtons() {
    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < animalArray.length; i++) {
      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("gif-btn");
      // Adding a data-attribute
      a.attr("data-gif", animalArray[i]);
      // Providing the initial button text
      a.text(animalArray[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gifSearch = $("#gif-input").val().trim();
    // Adding movie from the textbox to our array
    animalArray.push(gifSearch);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  $(document).on("click", ".gif-btn", displayMovieInfo);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

