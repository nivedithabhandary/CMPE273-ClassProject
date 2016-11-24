function GetDynamicTextBox(count) {
    "use strict";
    return '<div class="col-sm-8 col-sm-offset-3"><div class="form-group"><input type="text" class="form-control" id="vialocation' + count + '" name="vialocation" placeholder="via Location"></div></div>';
}

(function ($) {
    "use strict"; // Start of use strict
    $(document).ready(function () {
        var count = 0;

        //Adds dynamic textbox on plus icon click
        $('#addlocation').click(function () {
            count++;
            //$('#vialocation').append('<div class="col-sm-8 col-sm-offset-3"><div class="form-group"><input type="text" class="form-control" id="vialocation" name="vialocation" placeholder="via Location"></div></div>');
            $('#vialocation').append(GetDynamicTextBox(count));
            var newEl = document.getElementById('vialocation' + count);
            var autocomplete = new google.maps.places.Autocomplete(newEl);
            console.log("Added Location Textbox");
        });


        $("#tripplan input[type=text]").each(function () {
            var input = $(this).attr("id");
            console.log(input);
            var autocomplete = new google.maps.places.Autocomplete(document.getElementById(input));
        });
    });
})(jQuery);