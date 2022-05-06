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
    // res.render("pages/home");
    client
        .getEntries({ content_type: "work" })
        .then((response) => {
            const newData = response.items.map((entry) => {
                const clone = { ...entry.fields };
                // clone.workImage = clone.workImage.fields.file.url;
                // console.log(clone.workImage);
                return clone;
            });
            // console.log(newData);
            // console.log(newData[0].models[0].fields);
            res.render("pages/home", {
                data: newData,
            });
        })
        .catch(console.error);
});

app.get("/about", (req, res) => {
    res.render("pages/about", {
        data: {
            description: "dummy for now",
        },
    });
});

app.get("/work", (req, res) => {
    res.render("pages/work");
});

app.get("/work/:uid", (req, res) => {
    client
        .getEntries({
            content_type: "work",
            "fields.workTitle[match]": `'${req.params.uid}'`,
        })
        .then((response) => {
            const newData = response.items.map((entry) => {
                const clone = { ...entry.fields };

                return clone;
            });
            // console.log(newData);
            res.render("pages/detail", {
                data: newData,
            });
        })
        .catch(console.error);
});

app.listen(port, () => {
    console.log("Listening on port: " + port);
});
