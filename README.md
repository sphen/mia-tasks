# Mia Tasks

##### _An effecient MERN task manager without all the extras._

![mia tasks screenshot](https://github.com/sphen/mia-tasks/blob/main/miatasks.png?raw=true)

## About

I started freelancing in June 2020 as a way to help support myself through the Covid-19 pandemic. I needed a way to keep my day to day tasks organized, but had no need for a full blown team management platform like Trello or Asana. So I made one.

The app gives me what I need, a snapshot of what has been and what needs to be done, without all the extras normally found in task manager apps. The code is available on GitHub for anyone to clone and use for their own purposes.

## App Info

The app is built on the Mongo, Express, React, and Node stack.

Check out the demo app [here](https://miatasks.herokuapp.com). It’s hosted on a heroku free dyno, so it may take a few seconds to wake up.

![GitHub package.json version](https://img.shields.io/github/package-json/v/sphen/mia-tasks) ![GitHub issues](https://img.shields.io/github/issues-raw/sphen/mia-tasks) ![GitHub](https://img.shields.io/github/license/sphen/mia-tasks)


## Quick Start

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

View the Heroku Docs on [Heroku GitHub Deploys](https://devcenter.heroku.com/articles/github-integration) for more detailed steps.

## Road Map

- [x] Design Updates (ongoing)
- [x] Basic Authentication Functionality
- [ ] Tests with Jest
- [ ] Expand Authentication (Private Projects, etc.)


