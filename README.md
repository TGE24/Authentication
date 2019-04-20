# Securing NodeJS RESTful API's with JSON Web Tokens

Test app With Postman or Insomnia via the following RESTful Endpoints

Login| POST - http://localhost:3000/api/login?username=admin&password=admin -- Returns JWT which must be used in the headers of the following request

GET - http://localhost:3000/api/countries -- returns all the countries in the array

PUT - http://localhost:3000/api/countries/country-name (eg TOGO) -- adds a country to the array

DELETE - http://localhost:3000/api/countries/country-name (eg TOGO) -- deletes a country to the array
