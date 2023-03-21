Vizion API Challenge
====================

This is an API that meets the requirements of the [Vizion API Challenge](./CHALLENGE.md). It was built using:

- NestJS
- Typescript
- PostgreSQL
- Docker
- Sequelize
- Puppeteer

## Author
- Marcos Frony <mfrony@gmail.com>

#Set Up the project
## Dependencies
- Docker
- PostgreSQL
- node_modules

### Docker
[Install Docker](https://docs.docker.com/get-docker/), if it is not installed yet.

### PostgreSQL
#### Install
From the root of the project, run this command to install and start PostgreSQL.
```shell
docker-compose -f Docker/postgres-service/docker-compose.yml up -d
```
#### Create database and tables
Use [this dump file](./sql/vizion.db.sql) to create the database and the tables.

### node_modules
Make sure all the dependencies and devDependencies are installed. From the root of the project, run:
```shell
npm install
```

# Start the API
## Build
From the root of the project, run:
```shell
npm run build
```

## Start
From the root of the project, run:
```shell
npm start
```

# Testing
## Using Postman
### Reference
#### Request
```shell
POST / HTTP/1.1
Host: localhost:4000
Content-Type: application/json
Content-Length: 38

{
    "url": "http://www.github.com"
}
```
#### Response
```shell
{
    "id": 1,
    "url": "http://www.github.com",
    "created_at": "2023-03-21T06:22:09.777Z",
    "updated_at": "2023-03-21T06:22:09.777Z"
}
```

### Result
Copy the id from the response sent by the POST request to Reference and use it in the next request
#### Request
```shell
GET /1 HTTP/1.1
Host: localhost:4000
```

## Unit tests
I have only written tests for the **result.controller.ts** and **reference.controller.ts**. NestJS was the most appropriate framework for the solution for this challenge but it was the first time I used it.

There is still some learning curve and to avoid spending more time on this solution, I mostly tested it using Postman.

### Run the tests
```shell
npm run test:cov
```

### View code coverage in a browser
```shell
npm run test:opencoverage
```
