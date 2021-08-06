var cors = require('cors')

module.exports = app => {
    const markets = require("../controller/markets.controller");

    var router = require("express").Router();

    // Create a new News
    router.get("/:idspac", markets.findAll);
    app.use('/api/markets', cors(), router);
};