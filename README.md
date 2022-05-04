# myCookBook-angular-app
MyCookBook is a full stack app with NodeJS and Express Back-End Server and Angular for Front-End framework.
It uses MongoDB for Database.

This application is developed for the Project Defence for the Angular Course in SoftUni - April 2022. 

LOGGED IN USER FUNCTIONALITIES
-Create Recipe
-Edit and Delete their own recipes
-Like and Dislike other user's recipes 
-See their own profile, which shows all created and liked recipes (paginated with ngx-pagination module and sorted by date of creation), the total number of liked, disliked, created recipes, total number of likes and dislikes and the rank, level and rating of the user

NOT LOGGED IN USER FUNCTIONALITIES
-Access catalog, which can be sorted by number of likes/dislikes, oldest/newest recipes, or by dish type - Appetizer, Main Dish, Dessert or Snack. This page is also paginated with ngx-pagination module
-Access all users page, which shows all users in the application, paginated with ngx=pagination
-Access other users profile, which shows only the created recipes of the user, which are also paginated with ngx-pagination
-Search for user or recipe - When the search form is filled, a request is being sent to the nodeJS API. It returns all matches both for users and recipes with this criteria from the database.

APPLICATION DETAILS
-There are both guards on the front-end and back-end
-The filter functionality in the catalog page is only on the front-end
-The pagination is also only on the front-end, using the ngx-pagination module
-The authentication is with JWT, which is stored in the localStorage, along with the name, gender and email of the user. The JWT expires 16 hours after it's generation
-The JWT is placed in an authorization header in every request to the NodeJS API with an Interceptor Service on the front-end
-There is validation for the login, register and create form both on the front-end and on the back-end.
-All forms in the application are template-driven
-The Like and Dislike work with a request to the NodeJS API - if the user has already liked/disliked the recipe, the back-end returns a message. It also doesn't let the users like their own recipes.
-There is also ranking system on the application. On every login the user receives 10 points for the rating. On every created recipe - 40 points, for every like of their recipe the users receive 20 points. If they receive a dislike - their rating decreases with 10 points. 
-The highest rank is 11, the levels are bronze, silver, gold, platinum and diamond.



