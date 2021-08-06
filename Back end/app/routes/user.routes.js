var cors = require('cors')

module.exports = app => {
    const users = require("../controller/user.controller");

    var router = require("express").Router();

    // Create a new admin_details
    router.post("/", users.create);
    router.get("/:email", users.findOne);
    router.put("/:iduser", users.update);
    app.use('/api/user', cors(), router);
};