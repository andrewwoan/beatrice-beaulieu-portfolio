require("dotenv").config();
const contentful = require("contentful");
const fs = require("fs");
const path = require("path");
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const client = require("./backend/config/config");

// Link Up Express to Use Static Files
app.use(express.static(path.join(__dirname, "dist/assets")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("pages/home");
});

app.get("/about", (req, res) => {
    res.render("pages/about", {
        meta: {
            data: {
                description: "dummy for now",
            },
        },
    });
});

app.get("/work", (req, res) => {
    res.render("pages/work");
});

app.get("/work/:uid", (req, res) => {
    res.render("pages/detail");
});

app.listen(port, () => {
    console.log("Listening on port: " + port);
});
