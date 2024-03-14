# Task Manager API

## Description

Task Manager API is a RESTful API built with Node.js, Express, and MongoDB. It provides functionalities for user registration, login, and task management.

## Main Tools And Technologies Used

- JAVASCRIPT (A versatile programming language).
- NODE (Run JavaScript code on the server-side).
- EXPRESS (Node framework, meant to simplify the process of building complex server-side applications).
- MONGODB (Database for data persistence).
- MONGOOSE (Interacting with mongodb).
- JSON WEB TOKEN (Authenticating users).

## Prerequisites

- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)

## Setting up a MongoDB database

To start a new database instance run the following command

```sh
{path-to-mongod-file} --dbpath={path-to-data-storage}
mongodb/bin/mongod --dbpath=/Users/andresalba/mongodb-data
```

The connection URL would be: mongodb://127.0.0.1:27017

## MongoDB production instance configuration

- MongoDB hosting service must be used, the Atlas service is the one used in this app. This one is created by the MongoDB organization

- An account must be created at this [link](https://www.mongodb.com/cloud/atlas)

## Process for setting up a new instance (cluster)

1. Go to Clusters -> Create New Cluster
2. Select cloud provider, region, cluster tier, additional settings and cluster name
3. Once the instance is created, go to the Dashboard and click on _CONNECT_
4. Set up connection security
   1. Configure secure IP's. In this case all IP's must be whitelisted,the IP must be **0.0.0.0/0**.
   2. Create a database user
5. Connect to the database using the connection string defined in the GUI. Atlas instance connection client is Compass (Robo3T is not supported)

## Setting Up Your Environment

Follow these steps to clone, set up, and run this project on your local machine. This guide assumes you have a basic understanding of how Node.js, npm, and MongoDB work.

### Step 1: Clone the Repository

1. Open your terminal.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command to clone the repository: git clone <repository-url>

### Step 2: Navigate to the Project Directory

1. Once the repository is cloned, navigate to the project directory using the terminal:
   - `cd <project-directory>`
   - Replace <project-directory> with the name of the directory created by the clone operation.

### Step 3: Install Dependencies

1. Install all the necessary dependencies as specified in the package.json file by running:
   - `npm install`

### Step 4: Configure Environment Variables

1. Create a config.env file in the src directory if it doesn't already exist.
2. Open the config.env file and set the following environment variables:
   DATABASE= your mongodb database url
   PORT=The port number on which your application will run.
   JWT_SECRET=Your JSON Web Token (JWT) secret key.
   JWT_EXPIRES_IN=The duration after which the JWT expires.

### Step 5: Start the Server

Run the following command to start the server: `npm start`

### Step 6: Verify the Application is Running

1. Open your web browser and navigate to `http://localhost:<PORT>`, replacing <PORT> with the port number you specified in the .env file.
2. You should see your application running.

## Main Features

- **Users**: Users can register with the application and log in.
- **Tasks**: Tasks can be created, updated, deleted, and viewed by authenticated users.

## Authentication and Authorization

All task-related operations are secured using JWT authentication. Users must be authenticated and have the correct permissions to access these endpoints.

## API Endpoints

- **User Registration**: `POST http://localhost:3000/users/register`

  - Request body:{ "username": "john_doe", "password": "P@ssw0rd123" }

- **User Login**: `POST  http://localhost:3000/users/login`,

  - Request body:{ "username": "john_doe", "password": "P@ssw0rd123" }

- **Create Task**: `POST http://localhost:3000/tasks`

  - Headers :{"Authorization: Bearer YOUR_TOKEN_HERE"}
  - Request body: { "title": "Create Task","description":"any description"}

- **Get All Tasks**: `GET http://localhost:3000/tasks`

  - Headers :{"Authorization: Bearer YOUR_TOKEN_HERE"}
  - Response: Array of tasks

- **Get Task by ID**: `GET http://localhost:3000/tasks/65f1b62897ab5e1b88426ede`

  - Headers :{"Authorization: Bearer YOUR_TOKEN_HERE"}

- **Update Task**: `PUT http://localhost:3000/tasks/65f1b62897ab5e1b88426ede`,

  - Headers :{"Authorization: Bearer YOUR_TOKEN_HERE"}
  - Request body: { "completed": true}

- **Delete Task**: `DELETE http://localhost:3000/tasks/65f1b62897ab5e1b88426ede`
  - Headers :{"Authorization: Bearer YOUR_TOKEN_HERE"}

## Data Management

- **Import Data**: `npm run importData`
- **Delete Data**: `npm run deleteData`

**Note**: These data management scripts are intended for development and testing environments. Use them with caution.

## Advanced postman summary

- Enviroment variables can be created to store data that is going to be used in all requests. This can be done by creating an environment (dev or prod) and then creating environment variables with key value pairs. Then variables can be used using the following syntax: `{{env_variable_name}}``

- Authorization can be added to all requests in a collection, by setting the authotization type in the _Authorization_ tab for each request (default value is to be inherited for parent). Therefore, the authorization token must be defined for the whole collection. This can be done by selecting the collection options and then selecting _Edit_. The same options should appear but when a change is made it applies to all the requests.

- The authorization token can also be defined as an environment variable

- _Pre-requisite scripts_ could be defined to run Javascript code before the request is sent. The same happens for the _Tests_ tab, however this code is ran after sending the request.

- Sample script for defining an environment variable value

```js
// Check if the request was succesfull (pm object - short for postman)
if (pm.response.code === 200) {
  // Set the environment variable
  pm.environment.set("token", pm.response.json().token);
}
```
