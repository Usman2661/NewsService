# Introduction 
NEWS Service created using Node.js, Express, Typescript, Sequelize ORM, Postgres database and redis cache store.
# Getting Started
Prerequisites
1.	NodeJS
2.	yarn/npm
3.  Postgres 
4.  Redis 
5.  Git

# Instructions to run 

1. Clone the repo

2. In the root create a file caled .env to prevent having secrets in git codebase and add the following: 
```powershell
dbPort=<Port_For_Database_Here>
dbName=<Database_Name_Here>
dbUser=<Postgres_User_Here>
dbPassword=<Postgres_Password_Here>
dbHost=<Database_Host_HERE>
apiKey=<News_API_KEY>
apiUrl=<News_API_URL_HERE>
redisHost=<REDIS_HOST_HERE>
redisPort=<REDIS_PORT_HERE>
```

3. Install the dependancies, start server and run tests
```powershell
# install the server dependancies
yarn install
# run the server on port 4000 (Database migrations will automatically run and create schema if not created on the database)
yarn dev
# run api tests with newman using postman collections 
yarn test-api
```

4. API collections are available in the src/api_collections folder which can be imported into postman later can be used for documentation
