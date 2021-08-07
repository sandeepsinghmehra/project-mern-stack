# BLOG Website

Project

## How to run?

To run the project, first we need to install all the packages.
Run these two commands to download the packages for both frontend and backend in the root folder.

```
npm i
```

```
cd frontend && npm i
```

Then to run the complete project, use this command in the root folder:

```
npm run dev
```

To run just the backend, use this command in the root folder:

```
npm run server
```

To run just the client, use this command in the root folder:

```
npm run client
```

## Environment variables

I'm using MongoDB here so we need connect to a cluster, create a cluster with mongodb atlas. To connect it to our project add the connection link in a .env file in the root folder and name it MONGO_DB_URI.

```
PORT = 8000

MONGO_DB_URL = CONNECTION_LINK 

SECRET_KEY = Anything

NODE_ENV = setproduction
```

---

Usually you'd have to do this and I wouldn't upload my .env file because it has content that I wouldn't want to be public like database keys, secret_key, etc. But since I don't want you to do all the setup I'll include the .env file, so just go ahead and run it.

**The project will not work without this btw**

## Stack used

- Reactjs
- Nodejs
- Expressjs
- MongoDB
