# CodeSwap
## CodeSwap is a place for developers to share their projects and ideas.

It can be likened to GitHub, but it is focused mainly on ideas.

You can access CodeSwap through this [link](https://codeswap.vercel.app), or run it locally. If you wish to run it locally, you'll need to set up a PostgreSQL server either locally or remotely, and configure a `.env` file according to the `backend/.env.example` file in this repo.

### Description

The application is built on Node.js with Express.js and React, and the data is stored on a PostgreSQL server on Vercel.

- A user needs to login or sign in to CodeSwap in order to use it. There is no any sort of guest option available.

- When a user tries to sign in to CodeSwap, their password hash is stored in the Postgres server with their password is only known to themselves. Passwords are hashed using [`bcrypt`](https://www.npmjs.com/package/bcrypt).

- Logins are handled using [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) and login information is stored in the `window.localStorage` of the browser until the user manually logs out by clicking the "Log out" button in the menubar.

- Backend uses [`sequelize`](https://www.npmjs.com/package/sequelize) for populating or fetching from the Postgres database.

- Users can follow each other, with an option to see only posts from followed users. This section can be accessed through the "Following" button in the menubar.

- Users are also able to like posts and leave a comment.

- For almost every action a user takes, there is a notification pop up for three types of actions (`success`, `warning`, `error`) to inform them.