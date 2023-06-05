/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: __Yashvi Patel__ Student ID: __127423218__ Date: __31st May, 2023__
*
* Cyclic Web App URL: ________________________________________________________
*
* GitHub Repository URL: ______________________________________________________
*
********************************************************************************/

const express = require("express");
const path = require("path");
const { initialize, getAllPosts, getPublishedPosts, getCategories } = require("./blog-service.js");

const app = express();

app.use(express.static('public')); 

const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req,res) => {
  res.redirect("/about");
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
})

app.get("/blog", (req, res) => {
  getPublishedPosts()
  .then((data) => {
    res.send(data)
  })
  // Error Handling
  .catch((err) => {
    res.send(err);
  })
});

app.get("/posts", (req, res) => {
  getAllPosts()
    .then((data) => {
      res.send(data)
    })
    // Error Handling
    .catch((err) => {
      res.send(err);
    })
});

app.get("/categories", (req, res) => {
  getCategories()
  .then((data) => {
    res.send(data)
  })
  // Error Handling
  .catch((err) => {
    res.send(err);
  })
})

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "notFoundPage.html"));
})

initialize().then(() => {
  app.listen(HTTP_PORT, () => {
    console.log("Express http server listening on: " + HTTP_PORT);
  });
})