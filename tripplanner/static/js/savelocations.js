(function ($) {
"use strict"; // Start of use strict

    $(document).ready(function () {
		$('#savelocations').click(function () {
			console.log("Inside plan trip button function");
	        var mycookie = document.cookie;
			var useremail = mycookie.split('=')[1];
			console.log("useremail :" + useremail);
			//Fetch the start , end and via locations
			var nameOfAddress = $("#nameOfAddress").val();
			var location = $("#address").val();
			var locationList =[];
			var locationMap = new Map();
			$("input[name=location]").each(function () {
				locationList.push($(this).val());
			});

			console.log("nameOfAddress: " + nameOfAddress);
			console.log("location: " + location);
			console.log("locationList: " + locationList);
			for(var i=0;i<locationList.length;i=i+2){
				locationMap.set(locationList[i],locationList[i+1]);
			}
			//Sample GET and POST call .
			// TO DO : Replace them with actual calls
			console.log(locationMap);
			var inData = [{"email":useremail,"locations":locationList}];
			console.log(inData);
			var output = $.get("https://jsonplaceholder.typicode.com/posts/1");
			console.log("Output from server :" + JSON.stringify(output) + ":" + output.readyState);
			$.ajax({
				 type: "POST",
				 url: "http://localhost:5000/locations",
				 data: JSON.stringify(inData),
				 contentType: "application/json",
				 dataType: "json",
				 success: function (data, status, jqXHR) {
					  // do something
					  console.log("success");
                },
				 error: function (jqXHR, status) {
						console.log(status);
			}});
			//var postoutput = $.post("http://localhost:5000/locations", {
            //    email: 'rahulbharadwaj.v@gmail.com',
            //    name: 'home',
            //    address: '1334 The Alameda, San Jose, CA, United States'
            //});
			//console.postoutput("Post output:" + JSON.stringify(postoutput));

			//Dummy get call to server api
			//$.get("hello").done(function (data) {
			//      console.log("Output from my server :" + data);
			//});

			});
	});
})(jQuery);