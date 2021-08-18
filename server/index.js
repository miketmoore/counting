const express = require("express");
const app = express();
const port = 3001;
const countapi = require("countapi-js");

const apiKey = "***REMOVED***";
const incrementAmount = 1;

app.get("/api/count/get", (req, res) => {
  countapi
    .get(apiKey)
    .then((response) => {
      res.json({ count: response.value });
    })
    .catch((error) => {
      res.json({ message: "Unable to get current count", error });
    });
});

app.put("/api/count/update", (req, res) => {
  countapi
    .update(apiKey, incrementAmount)
    .then((response) => {
      res.json({ count: response.value });
    })
    .catch((error) => {
      res.json({ message: "Unable to update count", error });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
