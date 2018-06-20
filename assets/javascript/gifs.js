var topics = ["pikachu", "bulbasaur", "butterfree", "snorlax", "charizard", "mewtwo", "togepi", "umbreon"];

$(document).ready(function() {

function createButtons(){

    $("#buttons").empty();

    for (i=0; i < topics.length; i++){
        $("#buttons").append("<button class='btn btn-danger' data-poke='" + topics[i] + "'>" + topics[i] + "</button>");
    }
}

createButtons();

function pokeButtons(){
    $("button").on("click", function() {

        $("#display-gifs").empty();
        $("#gif-header").empty();

        var pokemon = $(this).attr("data-poke");

        $("#gif-header").append("<h2>Click on the image to animate!</h2>");

   
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        pokemon + "&api_key=dc6zaTOxFJmzC&limit=10";

    
        $.ajax({
        url: queryURL,
        method: "GET"
        })
      
        .then(function(response) {

            console.log(JSON.stringify(response));
       
            var results = response.data;

        
            for (var i = 0; i < results.length; i++) {

          
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            
                    var gifDiv = $("<div class='item'>");

            
                    var rating = results[i].rating;

            
                    var p = $("<p>").text("Rating: " + rating);

                    var title = $("<p>").text(results[i].title);

                    var pokeImage = $("<img>");
            
                    pokeImage.attr("src", results[i].images.fixed_height_still.url);

                    pokeImage.attr("data-state", "still");
                    pokeImage.attr("data-still", results[i].images.fixed_height.url);
                    pokeImage.attr("data-animate", results[i].images.fixed_height_still.url);
                    animate();

                    gifDiv.append(pokeImage);
                    gifDiv.append(title);
                    gifDiv.append(p);
                    

            
                    $("#display-gifs").prepend(gifDiv);
          }
        }
      });
  });
}

pokeButtons();

  $("#find-poke").on("click", function(event) {

    
    event.preventDefault();

   
    var pokemon = $("#poke-input").val().trim();

    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      pokemon + "&api_key=2Ztx15epIi1iPP4JJ5ihnfwdoCxy0U0U&limit=10";

   


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      topics.push(pokemon);
      createButtons();
      pokeButtons();
    });

    // -----------------------------------------------------------------------

  });

//Click function to animate gifs

function animate(){

    $("img").on("click", function() {
        
        var state = $(this).attr("data-state");
        
        if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
    });
}
})