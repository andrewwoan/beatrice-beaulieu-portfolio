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
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about", {
        meta: {
            data: {
                description: "dummy for now",
            },
        },
    });
    // client.getEntry("").then(function (entry) {
    //     console.log(entry.fields.aboutMe);
    //     res.render("about", {
    //         meta: {
    //             data: {
    //                 description: "dummy for now",
    //             },
    //         },
    //     });

    //     // console.log(entry.sys);
    // });
});

app.listen(port, () => {
    console.log("Listening on port: " + port);
});
