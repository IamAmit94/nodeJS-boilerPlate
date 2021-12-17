NODEJS BOILER PLATE

# PROJECT TITLE

A nice project with a nice description

# REQUIREMENTS

# ENVIRONMENT VARIABLES

This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|CORS           | Cors accepted values            | "*"      |
|CORS           | Cors accepted values            | "*"      |
|CORS           | Cors accepted values            | "*"      |
|CORS           | Cors accepted values            | "*"      |
|CORS           | Cors accepted values            | "*"      |
|CORS           | Cors accepted values            | "*"      |


# PRE-REQUISITES

For development, you will only need Node.js and a node global package, Yarn, installed in your environement

### NodeJs

- #### NodeJs installation on Windows

Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### NodeJs installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install curl 
      $ curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
      $ nvm install 'version'
      $ nvm ls (Command to list installed versions of node for the current user)
      $ nvm run default  --version (To find the default Node version set for the current user, type)
      $ nvm alias default 'version'


# GETTING STARTED

- Clone the repository
```
git clone  <git lab template url> <project_name>
```

# PROJECT STRUCTURE

The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build.  |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **configuration**        | Application configuration including environment-specific configs 
| **src/controllers**      | Controllers define functions to serve various express routes. 
| **src/lib**              | Common libraries to be used across your app.  
| **src/utils**            | Error handling of the API is done over here
| **src/router**           | Contain all express routes, separated by module/area of application                       
| **src/models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **src/helpers**          | Express middlewares which process the incoming requests before handling them |
| **src**/server.ts        | Entry point to express app                                                               |
| **src/settings**         | Contains the dataBase and the JWT related codes
| **src/validators**       | Contains all the validataion file related to projecte
|  **PLATFORM**            | Contain API Export file
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | 

# Building the project

### Configuring TypeScript compilation
```json
{
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "outDir": "dist",
      "sourceMap": true
    },
    
    "include": [
      "src/**/*.ts"
      

    ],
    "exclude": [
      "src/**/*.spec.ts",
      "test",
      "node_modules"
    
    ]
  }

```
# RUNNING THE BUILD
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on dist/index.js. Can be invoked with `npm start`                  |
| `build:copy`                   | copy the *.yaml file to dist/ folder      |
| `build:live`                   | Full build. Runs ALL build tasks       |
| `build:dev`                   | Full build. Runs ALL build tasks with all watch tasks        |
| `dev`                   | Runs full build before starting all watch tasks. Can be invoked with `npm dev`                                         |
| `test`                    | Runs build and run tests using mocha        |
| `lint`                    | Runs TSLint on project files       |



###### DEPENDENCIES USED

|  NPM                 
| **bcryptjs**      
 This module enables storing of passwords as hashed passwords instead of plaintext
 npm i bcryptjs  
 
 **body-parser**      
 Express body-parser is an npm library used to process data sent through an HTTP request body.  
 npm i body-parser

**dotenv**
DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process.
npm i dotenv

**express**
Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. || expressjs.com/ ||
npm i express

**joi**
Joi module is a popular module for data validation.
npm i joi

**jsonwebtoken**
jsonwebtoken is an implementation of JSON Web Tokens. 
npm i jsonwebtoken

**mongoose**
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
npm i mongoose

**nodemon**
nodemon is a tool that helps develop node. js based applications by automatically restarting the node application when file changes in the directory are detected.
npm i nodemon
