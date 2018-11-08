# Bearer Auth

## Overview
This application is a server with bearer authorization for sign up and sign in routes and utilizes MongoDB for storage of users and calendar entries

## Getting Started
- Clone this repository
- Ensure node.js is installed
    - If not, run the command `brew install node` in the terminal
- Ensure MongoDB is installed
    - If not, follow the instructions at [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
- Navigate to the `18-bearer-authorization` directory and run the command `npm i` to install dependencies
- Create a .env file
    - Set `PORT` to `8080`
    - Set `MONGODB_URI` to `mongodb://localhost:27017/bearerauth`
    - Set `SECRET` to `password`
- Create a folder to store the database
- In the terminal, run the command `mongod --dbpath=[path to database folder]` to start the database server
- In a different terminal window, run the command `node index.js` to start the web server

## Testing Instructions
- Open up Postman
    - Postman can be downloaded at [https://www.getpostman.com/](https://www.getpostman.com/)

- To sign up by making a POST request:
    - Click on the dropdown and change it to POST
    - Type `localhost:8080/signup` in the address bar
    - Click on the Body tab and set it to raw
    - In the body, type a note in JSON with the following format:
        - `{ "username": "[username]", "password": "[password]", "email": "[email]", "role": "[role]" }`
        - Role can be set to `user`, `editor`, or `admin`
    - Click Send
    - Copy the token for future use

- To sign in by making a POST request:
    - Click on the dropdown and change it to POST
    - Type `localhost:8080/signin` in the address bar
    - Click on the Authorization tab
        - Click on the Type dropdown and change it to Bearer Token
        - Paste the token in the Token field
    - Click Send

- To make a POST request to the Calendar:
    - Click on the dropdown and change it to POST
    - Type `localhost:8080/api/calendar` in the address bar
    - Click on the Authorization tab
        - Click on the Type dropdown and change it to Bearer Token
        - Paste the token in the Token field
    - Click on the Body tab and set it to raw
    - In the body, type a note in JSON with the following format:
        - `{ "month": "[month]", "date": "[date]", "note": "[note]", "user": "[user id]" }`
    - Click Send

- To make a GET request to the Calendar:
    - Click on the dropdown and change it to GET
    - For the calendar entry, type `localhost:8080/api/calendar/:id` in the address bar
    - For the user of the calendar entry, type `localhost:8080/api/calendar/:id/user` in the address bar
    - Click on the Authorization tab
        - Click on the Type dropdown and change it to Bearer Token
        - Paste the token in the Token field
    - Click Send

- To make a DELETE request to the Calendar:
    - Click on the dropdown and change it to DELETE
    - For the calendar entry, type `localhost:8080/api/calendar/:id` in the address bar
    - Click on the Authorization tab
        - Click on the Type dropdown and change it to Bearer Token
        - Paste the token in the Token field
    - Click Send

- To make a PUT request to the Calendar:
    - Click on the dropdown and change it to PUT
    - For the calendar entry, type `localhost:8080/api/calendar/:id` in the address bar
    - Click on the Authorization tab
        - Click on the Type dropdown and change it to Bearer Token
        - Paste the token in the Token field
    - Click on the Body tab and set it to raw
    - In the body, type a note in JSON with the following format:
        - `{ "month": "[month]", "date": "[date]", "note": "[note]", "user": "[user id]" }`
    - Click Send