# Donut Tycoon

## Purpose
This is a web application meant to demonstrate my skills in creating full stack applications. It was the first truly full stack application I ever built.

## Technologies Used

#### Front End
  The pages are created using EJS for templating. These pages are served by my Express server and styled using CSS.

#### Back End
  This app runs in Node.js with Express handling the server routing. I use additional libraries such a body parser and method override to add additional utilities to Express. My database is PostgreSQL, and I use knex.js as my Query Builder. I utilized additional features of knex, such as seeds and migrations to structure my database schema and populate it with sample data. 

  I will soon add authentication using Bcrypt.


#### Testing
  My tests are written using Mocha with the Chai expects library. I used a Test Driven Development approach to creating this app, where tests were written prior to the code they were testing.


#### Deployment
  The app can be viewed at https://donutfullstackdemo.herokuapp.com.
