require("dotenv").config();

const contentful = require("contentful");

const client = contentful.createClient({
    accessToken: process.env.ACCESS_TOKEN,
    space: process.env.SPACE_ID,
});

module.exports = client;
