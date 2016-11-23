(function ($) {
    "use strict"; // Start of use strict
    $(document).ready(function () {
		$("#tripplan input[type=text]").each(function() { 	
			var input = $(this).attr("id");
			console.log(input);
			var autocomplete = new google.maps.places.Autocomplete(document.getElementById(input));
		});
	});		
})(jQuery);   
