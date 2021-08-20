const express = require("express");
const app = express();
const port = 3002;
const countapi = require("countapi-js");

const apiKey = "***REMOVED***";
const incrementAmount = 1;

const successHandler =
  (_, res) =>
  ({ value }) => {
    res.status(200);
    res.json({ count: value });
  };

const errorHandler = (_, res) => (error) => {
  res.status(500);
  console.log(error);
  res.json({ message: "An error occurred" });
};

app.get("/api/count/get", (req, res) => {
  countapi
    .get(apiKey)
    .then(successHandler(req, res))
    .catch(errorHandler(req, res));
});

app.put("/api/count/update", (req, res) => {
  countapi
    .update(apiKey, incrementAmount)
    .then(successHandler(req, res))
    .catch(errorHandler(req, res));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
