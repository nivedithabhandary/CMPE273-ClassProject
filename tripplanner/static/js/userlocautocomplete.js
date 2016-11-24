(function ($) {
    "use strict"; // Start of use strict

    $(document).ready(function () {
        var count = 0;
        //Adds dynamic textbox on plus icon click
        $('#addlocation').click(function () {
            count++;
            $('#vialocation').append(GetDynamicTextBox(count));
            console.log("Added Location Textbox");
        });

        // TO DO :  FETCH USER'S SAVED LOCATIONS
        // DUMMY DATA
        var userLocations = [{
            "name": "My Home",
            "address": "4212 Lorren Drive, Fremont CA"
                    }, {
            "name": "My Work",
            "address": "1 Washington Square, San Jose, CA"
                    }]

        // Add User saved Locations to the datalist
        userLocations.forEach(function (location) {
            $("#locationsList").append('<option id="userloc" value="' + location.address + '">' + location.name + '</option>')
        });

    });
})(jQuery);


// Creates a Textbox
function GetDynamicTextBox(count) {
    "use strict";

    return '<div class="col-sm-8 col-sm-offset-3"><div class="form-group"><input type="text" class="form-control" id="vialocation' + count + '" name="location" placeholder="via Location" list="locationsList" onInput="createdatalist(this)"></div></div>';
}

// Removes Google prediction options from datalist 
function removePredictOptions(mydatalist) {
    "use strict";
    for (var i = mydatalist.options.length - 1; i >= 0; i--) {
        console.log("Inside remove datalist option function");
        if (mydatalist.options[i].id == "predloc") {
            mydatalist.removeChild(mydatalist.options.item(i));
        }
    }
}

// Creates adds options to datalist dynamically based on user input
function createdatalist(textbox) {
    console.log("Inside my DataList");
    var currenttextbox = textbox.id
    var userinput = $("#" + currenttextbox).val();

    var found = false;
    var datalist = document.getElementById("locationsList")
    for (var i = datalist.options.length - 1; i >= 0; i--) {
        console.log(datalist.options[i].value);
        if (userinput === (datalist.options[i].value)) {
            found = true;
            console.log("Found Match");
            break;
        }
    }

    if (!found) {
        // Remove old predictions from datalist
        removePredictOptions(datalist);

        // Callback function for google autocomplete service
        var displaySuggestions = function (predictions, status) {
            console.log("Inside callback for predictions");
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
            }
            predictions.some(function (prediction) {
                console.log("Inside Google predictions loop");
                if ((prediction.description) === userinput) {
                    console.log("same as google prediction");
                    return;
                }

                $("#locationsList").append('<option id="predloc" value="' + prediction.description + '"> </option>')
            });
            console.log("Size of datalist : " + document.getElementById("locationsList").options.length);
        };

        // Call Google Autocomplete service to fetch predictions based on user input
        var service = new google.maps.places.AutocompleteService();
        console.log(userinput)
        if (userinput != "") {
            service.getPlacePredictions({
                input: userinput
            }, displaySuggestions);
        }
    }
};