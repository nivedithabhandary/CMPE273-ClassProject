# CMPE273-ClassProject
Trip Planner using Uber vs Lyft's Price Estimation

Plan a trip which consists of a set of places and estimate the total cost between Uber and Lyft.
User location details are stored into a persistent MongoDB hosted on EC2 instance.
User can go to Plan Trip, enter start, end and vialocations to get the optimized route and Uber & Lyft prices.

#### Features included
* Google auto complete for all text boxes
* Optimized visualization on Google maps
* Price comparison between Uber and Lyft APIs on Plotly graph
* Google like display for saved locations
* Persistant data storage on MongoDB
* Google Oauth login


#### Team Contributions:

* Jaya Kirtani - Trip Planner application UI(Landing Page, User Page), Autopopulating the location textboxes with user saved locations and google predictions based on user input. 
* Shruthi Kulai - Data Visualization for route, bar graph plotting,autocomplete locations for input, Lyft Api Price Calculation
* Rahul Bharadwaj Vudutala - Providing Optimized Route, Fetching data from Uber API and optimize, Saving User Locations UI
* Niveditha Bhandary - MongoDB setup, REST API call (Location APIs), Google Oauth authentication

#### Challenges that we faced:
* Creating a location textbox which shows location suggestions based on user input. Suggestions should be combination of user saved locations and google autocomplete predictions - As per trip planner requirement mentioned, user should be able to plan his trip using his saved locations. We didnt want to limit user to only saved locations. Idea was to create a textbox like google maps where user can choose from his saved locations or pick from other suggestion provided. If we just need the location suggestion based on user input using Google Autocomplete ,we just need to provide the textbox name to google autocomplete api and google api does everything for you. But if we need a text box which shows user saved locations and also suggestion from google predictions , we need to create a suggestion list on our own on each user input to textbox from user saved locations and google predictions api. Providing this simple looking functionality , technically took considerable time and effort.
