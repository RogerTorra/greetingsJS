[![Code Climate](https://codeclimate.com/github/RogerTorra/greetingsJS/badges/gpa.svg)](https://codeclimate.com/github/RogerTorra/greetingsJS)
Activities agenda JS client
============

Simple AngularJS client for the Activities agenda, a Spring web application providing a RESTFul JSON API consumed by this client. The Activities agenda is available from [https://github.com// RogerTorra/springmvc-html](https://github.com// RogerTorra/springmvc-html)

To run locally, you need first node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

Then, use npm to install the dependencies in package.json, currently just the http-server module:
```
npm install
```

And to run the server on http://localhost:8000
```
npm run-script server
```

There is also a Procfile to run http-server once deployed to Heroku that calls npm start, which is intended just to run the application there.
