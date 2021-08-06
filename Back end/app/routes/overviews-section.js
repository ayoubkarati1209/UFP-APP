var cors = require('cors')

module.exports = app => {
    const over = require("../controller/overvie-section.controller");

    var router = require("express").Router();

    // Create a new News
    router.get("/:spac_id", over.findAll);

    app.use('/api/overview-section', cors(), router);
};