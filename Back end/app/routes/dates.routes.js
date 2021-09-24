var cors = require('cors')

module.exports = app => {
    const dates = require("../controller/dates.controller");

    var router = require("express").Router();

    // Create a new News
    router.get("/", dates.findAll);
    app.use('/api/dates', cors(), router);
};