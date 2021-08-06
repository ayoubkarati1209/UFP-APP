const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
global.__basedir = __dirname;
var path = require('path');

const app = express();
const db = require("./app/models");
db.sequelize.sync();
path = require("path");
multer = require("multer");
const jwt = require("jsonwebtoken");

var corsOptions = {
    origin: ""
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// set port, listen for requests
const PORT = process.env.PORT || 8050;
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require("./app/routes/news.routes")(app);
require("./app/routes/spac.routes")(app);
require("./app/routes/spacglobal.routes")(app);
require("./app/routes/overviews-section")(app);
require("./app/routes/filings.routes")(app);
require("./app/routes/upload.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/targets.routes")(app);
require("./app/routes/trusts.routes")(app);
require("./app/routes/markets.routes")(app);

// simple route
app.use(express.static(path.join(__dirname, 'public')));

app.get("/:name", (req, res) => {
    res.sendFile(path.join(__dirname, "./app/resources/uploads" + '/' + req.params.name));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});