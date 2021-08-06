var cors = require('cors')

module.exports = app => {
    const trusts = require("../controller/trusts.controller");

    var router = require("express").Router();

    // Create a new News
    router.get("/:spac_id", trusts.findAll);
    app.use('/api/trusts', cors(), router);
};