// const express = require("express");
import express from "express"; // ts compiles code to valid es6 code node recognises - we can take advantage of new js features
import { listings } from "./listings";
// import bodyParser from "body-parser"; - deprecated

const app = express();
const port = 9000;

// parse incoming requests as json and expose the resulting object in req.body
// app.use(bodyParser.json()); // middleware function express provides

// Express now provides a built-in middleware to parse incoming requests with JSON payloads that is based on bodyParser
app.use(express.json());

// /listings
app.get("/listings", (_req, res) => {
  return res.send(listings);
});

// /delete-listing
app.post("/delete-listing", (req, res) => {
  // we expect the id of the item or listing to be deleted to be sent as part of the req body
  const id: string = req.body.id;

  // iterates through listing array and in any moment in time the iterated list item id is equal to req.body we can do something
  // 1 ) delete listing, 2) send deleted listing
  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      // specify index we want to delete and delete a single listing
      return res.send(listings.splice(i, 1));
    }
  }

  // if we go through the listings array and dont find the id we want to delete - we'll send a simple response
  return res.send("Failed to delete listing");
});

// in order for server to access data in post request we install body parser middleware to parse the req body
app.listen(port);

console.log(`[app]: http://localhost:${port}`);
