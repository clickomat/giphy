var categoryList = ["apple", "banana", "carrot"];

// display category buttons
 function addBtn() {

	// empty to avoid repeat buttons
	$("#buttonCat").empty();

	// Loop through the categoryList array
	for (var i = 0; i < categoryList.length; i++) {
		// make buttons for each category
		var btn = $("<button>");
		btn.addClass("category");
		btn.attr("data-name", categoryList[i]);
		btn.text(categoryList[i]);

		// place buttons on the page
		$("#buttonCat").append(btn);
	}

	
 }
 $("#btn-add").on("click", function(event) {
        
    // Prevents clearing of page on submit
    event.preventDefault();

    // get new category from input box
    var category = $("#input").val().trim();
    // add new category to categoryList array
    categoryList.push(category);

    // calling addBtn function
    addBtn();
    console.log(category)
});


 //call functions
 addBtn();
 console.log("ok")