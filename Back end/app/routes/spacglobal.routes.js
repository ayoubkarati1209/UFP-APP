var cors = require('cors')

module.exports = app => {
    const spacs = require("../controller/spac-global.controller");
    var router = require("express").Router();

    // Create a new admin_details

    router.get("/", spacs.findAll);
    router.get("/tickers", spacs.spacsticker);
    router.get("/all", spacs.findAllPagination);
    router.get("/:idspac", spacs.findOne);
    router.get("/r/:idspac", spacs.rFind);
    app.use('/api/spacsglobal', cors(), router);
};