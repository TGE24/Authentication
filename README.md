# Securing NodeJS RESTful API's with JSON Web Tokens

## Setting up the project

* Install npm modules in your main directory by running `npm install`.
* Run your app - `npm start`.

## Test app With Postman or Insomnia via the following RESTful Endpoints

* POST - http://localhost:3000/api/login?username=admin&password=admin -- Returns JSON Web Token

* After Successful login a JSON Web Token is returned, copy the token and use in the header as the `x-access-token` with the returned token as it's value for the following endpoints

* GET - http://localhost:3000/api/countries -- returns all the countries in the array

* PUT - http://localhost:3000/api/countries/country-name (replace country-name with any country eg TOGO) -- adds a country to the array

* DELETE - http://localhost:3000/api/countries/country-name (replace country-name with any country eg TOGO) -- deletes a country to the array
