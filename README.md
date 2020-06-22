# Culinary Recipes [DeliveryMuch Challenge]
Developed using Typescript

- Express (Framework for web application development)
- Tsyringe (Dependency injection)
- Axios (Sending requests to external api)
- Jest (Unitary tests)

API developed based on the SOLID principles

This API has only one get route, it gets a list of recipes in the RecipePuppy API from the ingredients passed in 'i': string that contains 0 to 3 ingredients names; Besides that a GIF is added to the recipe fetched in the Giphy API from the recipe title delivered by RecipePuppy.

API route call example:
${host}/recipes?i=onion,tomato,potato


## Installing project using docker

1. sudo apt install docker

--- development environment ---

2. docker build -f Dockerfile.dev -t culinary-recipes-dev .

3. docker run --name culinary-recipes-dev -p 3333:3333 culinary-recipes-dev

or

2a. docker-compose up -d culinary-recipes-dev

--- production environment ---

2. docker build -f Dockerfile.prod -t culinary-recipes-prod .

3. docker run -d --name culinary-recipes-prod -p 3333:3333 culinary-recipes-prod

## Running tests

1. sudo apt install node
2. yarn install
3. yarn test

## Things i could improve

- Check unit tests before running production docker container
- Input data validation ie. Yup
- Improvement in providers with environment settings being able to change the api that seeks recipes, and working with backup APIs
