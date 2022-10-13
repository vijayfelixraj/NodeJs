const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extened: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcom to vijay felix application" });
});

require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");

/**
 *  When we re-run the application if need to clear the database records. 
 *  use the focus: true while sync. "db.sequelize.sync({ force: true})"
 **/
db.sequelize.sync()
    .then(() => {
        console.log("Drop and re-sync db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " +  err.message);
    }); 