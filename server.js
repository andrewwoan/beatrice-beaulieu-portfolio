require("dotenv").config();
const path = require("path");
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const client = require("./backend/config/config");

// Link Up Express to Use Static Files

app.use(express.static(path.join(__dirname, "dist/assets")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.locals.basedir = app.get("views");

const getAllData = async () => {
    let home = [];
    let work = [];
    await client
        .getEntries()
        .then((response) => {
            const newData = response.items.map((entry) => {
                const clone = { ...entry.fields };
                if (clone.workTitle) {
                    // console.log(clone.workImage.fields);
                    work.push(clone.workImage.fields.file.url);
                } else {
                    home.push(clone.profilePicture[1].fields.file.url);
                }
            });
        })
        .catch(console.error);

    return {
        home,
        work,
    };
};

app.get("/", async (req, res) => {
    // res.render("pages/home");
    const data = await getAllData();

    // console.log(data);

    res.render("pages/home", {
        data,
    });

    // client
    //     .getEntries({ content_type: "about" })
    //     .then((response) => {
    //         const newData = response.items.map((entry) => {
    //             const clone = { ...entry.fields };
    //             // clone.workImage = clone.workImage.fields.file.url;
    //             // console.log(clone.workImage);
    //             return clone;
    //         });
    //         // console.log(newData[0].profilePicture[1].fields.file.url);
    //         // console.log(newData[0].models[0].fields);
    //         res.render("pages/home", {
    //             data: newData[0],
    //         });
    //     })
    //     .catch(console.error);
});

app.get("/about", async (req, res) => {
    res.render("pages/about", {
        data: {
            description: "dummy for now",
        },
    });
});

app.get("/work", async (req, res) => {
    res.render("pages/work");
});

app.get("/work/:uid", async (req, res) => {
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
