function GetDynamicTextBox(count) {
    "use strict";
    //    return '<div class="col-xs-8 col-sm-offset-3"><div class="form-group"><div class="input-group input-group-unstyled"><input type="text" class="form-control" id="vialocation' + count + '" name="vialocation" placeholder="via Location"><span class="input-group-addon"><a id="remove" onclick="removeTextbox()"><i class="fa fa-times fa-1x" style="color:white;"></i></a></span></div></div></div>';

    return '<div class="form-group"><div class="col-xs-10 col-sm-8 col-sm-offset-3"><input type="text" class="form-control" id="vialocation' + count + '" name="vialocation" placeholder="via Location"></div><div class="col-xs-1"><a id="remove" title ="Delete via Location" onclick="removeTextbox(this)"><i class="fa fa-times-circle-o fa-1x" style="color:white;"></i></a></div></div>';

}

function removeTextbox(elem) {
    console.log("Inside remove textbox function");
    //Remove Textbox on icon click
    $(elem).parent().parent().remove();
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