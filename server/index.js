const express = require("express");
const app = express();
const port = process.env.PORT ? process.env.PORT : 80;
const countapi = require("countapi-js");

const apiKey = process.env.COUNTING_API_KEY;
if (!apiKey || typeof apiKey !== "string" || apiKey.trim("") === "") {
  console.error(
    "The COUNTING_API_KEY environment variable must be defined and a valid, non-empty string"
  );
  process.exit(1);
}

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

app.get("/count/get", (req, res) => {
  countapi
    .get(apiKey)
    .then(successHandler(req, res))
    .catch(errorHandler(req, res));
});

app.put("/count/update", (req, res) => {
  countapi
    .update(apiKey, incrementAmount)
    .then(successHandler(req, res))
    .catch(errorHandler(req, res));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
