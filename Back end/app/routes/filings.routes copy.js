var cors = require('cors')

module.exports = app => {
    const filings = require("../controller/filings.controller");

    var router = require("express").Router();

    // Create a new News
    router.get("/:idspac", filings.findAll);
    app.use('/api/directors', cors(), router);
};