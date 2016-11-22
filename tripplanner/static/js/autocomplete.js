/* (function ($) {
    "use strict"; // Start of use strict
    $(document).ready(function () {	
		 var input = document.getElementById('start');
	     var autocomplete = new google.maps.places.Autocomplete(input);
	});	
})(jQuery); // End of use strict */ 

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

$("#addlocation").on('click',function (evt) {		
		evt.preventDefault();
		$("#tripplan input[type=text]").each(function() { 
			var currentInp = $(this).attr("id");
			console.log(currentInp);
			var placeBox = new google.maps.places.Autocomplete(document.getElementById(currentInp));
		});		
});