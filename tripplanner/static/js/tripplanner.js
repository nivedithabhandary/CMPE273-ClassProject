function GetDynamicTextBox(count) {
    "use strict";
    return '<div class="col-sm-8 col-sm-offset-3"><div class="form-group"><input type="text" class="form-control" id="vialocation' + count + '" name="vialocation" placeholder="via Location"></div></div>';
}

function plotMap() {	
        var poly;
		//To be populated with the optimized route from google maps Api
        var PitStops = [{
            name: "Stop 1",
            latlng: new google.maps.LatLng(19.0760,72.8777)
        }, {
            name: "Stop 2",
            latlng: new google.maps.LatLng(12.9716,77.5946)
        }, {
            name: "Stop 3",
            latlng: new google.maps.LatLng(12.9141,74.8560)
        }, {
            name: "Stop 4",
            latlng: new google.maps.LatLng(13.0827,80.2707)
        } ];

		var icon = {
			url: "../static/img/taxi.jpg", // url
			scaledSize: new google.maps.Size(25, 25) // scaled size
    
		};

        var mapOptions = {
            zoom: 0,
            center: new google.maps.LatLng(0, 0),
            mapTypeId: google.maps.MapTypeId.ROADMAP
         };

        var polyOptions = {
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 4
        }

        var map = new google.maps.Map(document.getElementById("canvas-map"), mapOptions);

        poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);

        var path = poly.getPath();
     
        var latlngbounds = new google.maps.LatLngBounds( );

        for ( var i = 0; i < PitStops.length; i++ ) {
            new google.maps.Marker( {
                position: PitStops[i].latlng,
                map: map,
				icon:icon,
				animation: google.maps.Animation.DROP,
                title: PitStops[i].name
            } );
            path.push(PitStops[i].latlng);
            latlngbounds.extend( PitStops[i].latlng );
        }
        map.fitBounds( latlngbounds );
    
}

function plotChart(){
	var data = [{
        x: ['UBER', 'LYFT'],
        y: [20, 15],
		type: 'bar'
	}];

	Plotly.newPlot('uber_lyft_chart', data);
}


(function ($) {
    "use strict"; // Start of use strict

    $(document).ready(function () {
		var count = 0;

        // jQuery for page scrolling feature - requires jQuery Easing plugin
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top - 50)
            }, 1250, 'easeInOutExpo');
            event.preventDefault();
        });

        // Highlight the top nav as scrolling occurs
        $('body').scrollspy({
            target: '.navbar-fixed-top',
            offset: 51
        });

        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function () {
            $('.navbar-toggle:visible').click();
        });

        // Offset for Main Navigation
        $('#mainNav').affix({
            offset: {
                top: 100
            }
        });

        // Initialize and Configure Scroll Reveal Animation
        window.sr = ScrollReveal();
        sr.reveal('.sr-icons', {
            duration: 600,
            scale: 0.3,
            distance: '0px'
        }, 200);
        sr.reveal('.sr-button', {
            duration: 1000,
            delay: 200
        });
        sr.reveal('.sr-contact', {
            duration: 600,
            scale: 0.3,
            distance: '0px'
        }, 300);

        // Initialize and Configure Magnific Popup Lightbox Plugin
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
        });

        //Adds dynamic textbox on plus icon click
        $('#addlocation').click(function () {
			count++;
            //$('#vialocation').append('<div class="col-sm-8 col-sm-offset-3"><div class="form-group"><input type="text" class="form-control" id="vialocation" name="vialocation" placeholder="via Location"></div></div>');
            $('#vialocation').append(GetDynamicTextBox(count));
			var newEl = document.getElementById('vialocation' + count);			
			var autocomplete = new google.maps.places.Autocomplete(newEl);
            console.log("Added Location Textbox");
        });

        // Hide the Trip Map div when page is first loaded
        $('#tripmap').hide();
        //$('#visualization').hide()

        // On click of button "Plan My Trip" collects information from server about best route ,Uber and Lyft prives and shows visualization 
        $('#planmytrip').click(function () {
            console.log("Inside plan trip button function");

            // On button click show the div meant for visualization
            $('#tripmap').show();
			
			//function to plot the route
			plotMap();
			
			//function to plot comparison chart
			plotChart();
            // scroll to the visualization div
            $('html,body').animate({
                scrollTop: $("#tripmap").offset().top
            }, 'slow');

            //Fetch the start , end and via locations
            var startlocation = $("#start").val();
            var endlocation = $("#end").val();
            var vialocations = [];
            $("input[name=vialocation]").each(function () {
                vialocations.push($(this).val());
            });

            console.log("Start: " + startlocation);
            console.log("End: " + endlocation);
            console.log("ViaLocations: " + vialocations);

            //Sample GET and POST call .
            // TO DO : Replace them with actual calls
            var output = $.get("https://jsonplaceholder.typicode.com/posts/1");
            console.log("Output from server :" + JSON.stringify(output) + ":" + output.readyState);

            var postoutput = $.post("https://jsonplaceholder.typicode.com/posts", {
                title: 'foo',
                body: 'bar',
                userId: 1
            });
            console.log("Post output:" + JSON.stringify(postoutput));

            $.get("hello").done(function (data) {
                console.log("Output from my server :" + data);
            });

        });


        //Add Content Here

    });
})(jQuery); // End of use strict