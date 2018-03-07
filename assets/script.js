$(document).ready(function() {
  $(".adds").hide();
  console.log("ready!");
  $("#input").focus();
  var categoryList = ["apple", "banana", "carrot"];

  // display category buttons
  function addBtn() {
    // empty to avoid repeat buttons
    $(".gifs").empty();

    // Loop through the categoryList array
    for (var i = 0; i < categoryList.length; i++) {
      // make buttons for each category
      var btn = $("<button>");
      btn.addClass("category");
      btn.attr("data-name", categoryList[i]);
      btn.text(categoryList[i]);

      // place buttons on the page
      $(".gifs").append(btn);
    }
  }
  addBtn();
  //this is the add a button section
  $("#addCat").click(function(event) {
    event.preventDefault();

    // get new category from input box
    var category = $("#input")
      .val()
      .trim();
    // add new category to categoryList array
    categoryList.push(category);

    // calling addBtn function
    addBtn();

    $("#input").focus();
    console.log(category);

    loadGif();
  });

  //call functions
  addBtn();
  console.log("ok");
  // load gifs
  function loadGif() {
    $(".category").on("click", function() {
      $(".adds").fadeIn(1500);
      $(".adds").empty();
      console.log("clicked");
      search = $(this).text();
      console.log(this);
      var giphyURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        search +
        "&limit=10&api_key=hZrXZ2RHRbjtDf7RlxHTZbaZnhiJt4kO";

      $.ajax({
        url: giphyURL,
        method: "GET"
      }).then(function(response) {
        console.log(response.data);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var imageURL = results[i].images.fixed_height.url;
          var imageStillURL = results[i].images.fixed_height_still.url;
          var rating = results[i].rating;
          var divTag = $("<div>");
          var pTag = $("<p>").text("Rating: " + rating);
          var imgTag = $("<img>").attr("src", imageStillURL);
          imgTag.attr("data-still", imageStillURL);
          imgTag.attr("data-animate", imageURL);
          imgTag.attr("data-state", "still").attr("class", "gif");
          $(".adds").append(divTag);
          divTag.attr("class", "gifDiv");
          divTag.append(pTag);
          divTag.append(imgTag);
        }
      });
    });
  }
  loadGif();
  $("body").on("click", ".gif", function() {
    var src = $(this).attr("src");
    if ($(this).hasClass("playing")) {
      //stop
      $(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
      $(this).removeClass("playing");
    } else {
      //play
      $(this).addClass("playing");
      $(this).attr("src", src.replace(/\_s.gif/i, ".gif"));
    }
  });
 
});
