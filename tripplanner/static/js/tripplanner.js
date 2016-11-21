function GetDynamicTextBox() {
    "use strict";
    return '<div class="col-sm-8 col-sm-offset-3"><div class="form-group"><input type="text" class="form-control" id="vialocation" name="vialocation" placeholder="via Location"></div></div>';
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

        //Adds dynamic textbox on plus icon click
        $('#addlocation').click(function () {

            //$('#vialocation').append('<div class="col-sm-8 col-sm-offset-3"><div class="form-group"><input type="text" class="form-control" id="vialocation" name="vialocation" placeholder="via Location"></div></div>');
            $('#vialocation').append(GetDynamicTextBox());
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