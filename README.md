# Mia Tasks

##### _An effecient MERN task manager without all the extras._

### Quick Start

1. Create a '.env' file in the root directory.
2. Add a MONGO_URI variable to the .env file and set it to your mongo uri.
3. Add a NODE_ENV variable to the .env file and set it to 'development'.

Your .env should look like this:

```bash
NODE_ENV=development
MONGO_URI=mongodb+srv://...
```

##### Install Dependencies

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:1337 and client on http://localhost:3000
```

## Deployment

- Create new Heroku app.
- Add Config Vars from .env file to Heroku.
- Push to a github repo.
- Link repo with your new Heroku app.
- ✨Magic ✨

View the Heroku Docs on [Deploying with Git](https://devcenter.heroku.com/articles/git) for more detailed steps.

## App Info

#### Author

[![sphen.net](https://img.shields.io/badge/Sphen-sphen.net-yellow?style=for-the-badge)](https://sphen.net)

![GitHub package.json version](https://img.shields.io/github/package-json/v/sphen/mia-tasks) ![GitHub issues](https://img.shields.io/github/issues-raw/sphen/mia-tasks) ![GitHub](https://img.shields.io/github/license/sphen/mia-tasks)
