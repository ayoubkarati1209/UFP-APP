var cors = require('cors')

module.exports = app => {
    const targets = require("../controller/targets.conroller");
    var router = require("express").Router();

    // Create a new admin_details

    router.get("/:id", targets.findOne);
    app.use('/api/targets', cors(), router);
};