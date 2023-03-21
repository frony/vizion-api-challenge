Vizion API Challenge
====================

This is an API that meets the requirements of the [Vizion API Challenge](./CHALLENGE.md). It was built with:

- NestJS
- Typescript
- PostgreSQL
  - Docker
  - Sequelize

<a name="author"></a>
## Author
- Marcos Frony <mfrony@gmail.com>

#Set Up the project
## Dependencies
- Docker
- PostgreSQL
- node_modules

### Docker
[Install Docker](https://docs.docker.com/get-docker/)

### PostgreSQL
From the root of the project, run this command to install and start the database
```shell
docker-compose -f Docker/postgres-service/docker-compose.yml up -d
```
Use [this dump file](./sql/vizion.db.sql) to create the database and the tables.

### node_modules
Make sure all the dependencies and devDependencies are installed. From the root of the project, run:
```shell
npm install
```

