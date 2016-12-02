// function to plot optimized route on google maps
function plotMap(places) {
    console.log (" inside plot map");
	var allPropertyNames = Object.keys(places);	
	var coords = []; //array to store co-ordinates of optimized route
	for (var j=0; j<allPropertyNames.length; j++) {
		var name = allPropertyNames[j];
		var value = places[name];
		coords.push(value);    
	}
	
    var poly;
    var stopsList = [];
    $.each( coords, function( index, value ){
        var pitStops = {};        
        pitStops["name"] = "Stop "+ (index + 1);
        pitStops["latlng"] = new google.maps.LatLng(value[0],value[1])
        stopsList.push(pitStops);        
    });

    var icon = {
        url: "../static/img/taxi.jpg", // url
        scaledSize: new google.maps.Size(25, 25) // scaled size
    };

	var infowindow = new google.maps.InfoWindow({});

    var mapOptions = {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

	var lineSymbol = {
		path: 'M 0,-1 0,1',
		strokeOpacity: 1,
		scale: 3
	};

    var polyOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.0,
        icons: [{
			icon: lineSymbol,
			offset: '0',
			repeat: '20px'
		}]
    }

    var map = new google.maps.Map(document.getElementById("canvas-map"), mapOptions);

    poly = new google.maps.Polyline(polyOptions);
    poly.setMap(map);

    var path = poly.getPath();

    var latlngbounds = new google.maps.LatLngBounds();
	var markers = [];
    for (var i = 0; i < stopsList.length; i++) {
		var data = stopsList[i];
		var marker = new google.maps.Marker({
            position: stopsList[i].latlng,
            map: map,
            //icon: icon,
            animation: google.maps.Animation.DROP,
            title: stopsList[i].name
        });
        path.push(stopsList[i].latlng);
        latlngbounds.extend(stopsList[i].latlng);

		var infowindow = new google.maps.InfoWindow({
			content: data.name
		});
		infowindow.open(map, marker);
		//Attach click event to the marker.
        (function (marker, data) {
                google.maps.event.addListener(marker, 'click', function (e) {
                    //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                    //infowindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.name + "</div>");
					infowindow.setContent('<IMG BORDER="0" ALIGN="Left" SRC="../static/img/taxi.jpg" style ="width:20px;">'+' '+ data.name);
                    infowindow.open(map, marker);
                });
        })(marker, data);
    }
    map.fitBounds(latlngbounds);
}

//function to plot bar chart for price comparison
function plotChart(uberPrice,lyftPrice) {
    var data = [{
        x: ['UBER', 'LYFT'],
        y: [uberPrice, lyftPrice],
        marker: {
            color: ['rgba(31,186,214,1)', 'rgba(234, 11, 140,1)'],
            width: 1.5
        },
        type: 'bar'
	}];
    var layout = {
        title: 'Look at the comparison!'
    };
    Plotly.newPlot('uber_lyft_chart', data, layout);
}

(function ($) {
    "use strict"; // Start of use strict

    $(document).ready(function () {

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

        // User Login
        $('#login').click(function () {
            console.log("inside login function");
            window.location.replace("/index");
        });

        //User Log Out
        $('#logout').click(function () {
            console.log("inside logout function");
            window.location.replace("/logout");
        });


        // Hide the Trip Map div when page is first loaded
        $('#tripmap').hide();
        //$('#visualization').hide()

        // On click of button "Plan My Trip" collects information from server about best route ,Uber and Lyft prives and shows visualization
        $('#planmytrip').click(function () {
            console.log("Inside plan trip button function");

            // On button click show the div meant for visualization
            $('#tripmap').show();

			//creating user data in json format to be used for the google optimized route api
			var origin = $("#start").val();
			var destination = $("#end").val();
			var waypoints =[];
			$("input[id^=vialocation]").each(function() {
				waypoints.push($(this).val());
			});
			var inData =[{"origin":origin,"destination":destination,"waypoints":waypoints}];			
			$.ajax({
				 type: "POST",
				 url: "http://localhost:5000/fetchPrices",
				 data: JSON.stringify(inData),
				 contentType: "application/json",
				 dataType: "json",
				 beforeSend: function(){
					// Show image container
					$("#loader").show();
				 },
				 success: function (data, status, jqXHR) {
					console.log("success");            
					var places = data[0].places;
					var uberPrice = data[0].uberPrice;
					var lyftPrice = data[0].lyftPrice;
					var locationLatLng = data[0].locationLatLng;
					plotMap(locationLatLng);
					plotChart(uberPrice,lyftPrice);
				},
				complete:function(data){
                   // Hide image container
                    $("#loader").hide();
                },
				 error: function (jqXHR, status) {
						console.log(status);
					  // error handler
					  //console.log("failure:"+ status);
				 }
			});

			/*$.post("http://localhost:5000/fetchPrices",JSON.stringify(inData),
			function(data, status){
        console.log(data);
			});*/

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

            //Dummy get call to server api
            //$.get("hello").done(function (data) {
            //      console.log("Output from my server :" + data);
            //});

        });

        //Add Content Here

    });
})(jQuery); // End of use strict
