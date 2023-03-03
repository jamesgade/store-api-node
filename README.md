# store-API-node

a nodejs(18.13.0) application with one powerful endpoint. The app runs locally.

## Setup

### Requirements
- node (latest version)
- MongoDB Compass

### Local setup

##### 1. Database Connection
- Open MongoDB Compass.
- connect to 'mongodb://localhost:27017'.
- your database will be created named as 'store-api'.

##### 2. Run server
- clone the repo and perform 'npm install'.
- initially perform 'node populate.js' once to push products.json contents to mongodb.
- run the app using: 'npm start'.
- For postman & Integration, API will be available on endpoint http://localhost:5000/api/v1/products.
- This is only a single GET request, you can access on browser.

## THE ENDPOINT
- GET - http://localhost:5000/api/v1/products.
- an API endpoint to get products from database with powerful queries.

## API Docs,
- In browser, navigate to http://localhost:5000/api/v1/docs to read swagger docs.
