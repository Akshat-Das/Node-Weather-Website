const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

// Setup handlebars engine and views location
app.set("views", path.join(__dirname, "../template/views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "../template/partials"));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Akshat Das",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Akshat Das",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "If there is any error please contact this number",
    name: "Akshat Das",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an adress",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address: req.query.address,
        location: place,
        forecast: forecastdata,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error Page",
    name: "Akshat Das",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error Page",
    name: "Akshat Das",
    error: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port + ".");
});
