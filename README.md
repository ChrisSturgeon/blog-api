# Blog API

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [Concepts and Ideas Learnt](#concepts-and-ideas-learnt)
- [Areas to Improve](#areas-to-improve)
- [Contact](#contact)

## Overview

A REST API for my personal blog created with Express and MongoDB. Post publishing routes are protected with JWT authentication, but visitors are free to leave comments either anonymously or with a username. The API is intergrated in my personal site (built with React) for displaying posts and comments.

View the live project [here](https://www.chrissturgeon.co.uk/#/blog) and view the project guidelines [here](https://www.theodinproject.com/lessons/nodejs-blog-api).

![Front page screenshot](/public/images/screenshot.jpg 'IMG DESCRIPTION')

### Built With

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Express Validator](https://github.com/express-validator/express-validator)
- [Passport](https://www.passportjs.org/)
- [bcryptJS](https://www.npmjs.com/package/bcryptjs)

## Features

- Sensitive routes protected with JWT tokens and authencation.
- Salt and hashing of passwords on new user creation.
- Post Markdown stored as string with database, for rendering as Markdown in React front end with the help of [react-markdown](https://github.com/remarkjs/react-markdown).
- Routing to fetch all or individual posts and comments, along with summaries of posts.

### Concepts and Ideas Learnt

- How to create resource routing in alignment with REST principles.
- The advantages of seperating backend and frontend and having the two communicate through a REST API. For example, greater modularity, each can be maintained and updated separately, frameworks can be switched with greater ease etc.
- How to use JWT tokens to authenticate users.

### Areas to Improve

With more time I would have liked to have implemented more features and improved others, such as:

- Intergrated notifications, so that I would receive an email each time someone comments upon one of my posts.
- Add functionality for me to reply directly to an individual comment.
- Add keywords to each post and allow visitors to filter/search by them.

## Contact

- sturgeon.chris@gmail.com
- [www.chrissturgeon.co.uk](https://chrissturgeon.co.uk/)
- [LinkedIn](https://www.linkedin.com/in/chris-sturgeon-36a74254/)
