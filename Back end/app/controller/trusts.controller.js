const { overviews } = require("../models");
const db = require("../models");

const Op = db.Sequelize.Op;
exports.findAll = (req, res) => {

    const { page, size, name } = req.query;
    const spac_id = req.params.spac_id;
    db.trusts.findOne({
        where: { spac_id: spac_id },
    }).then(news => {
        res.json(news);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving spacs."
        });
    });
};
exports.All = (req, res) => {

    const { page, size, name } = req.query;
    const spac_id = req.params.spac_id;
    db.trusts.findAll({
    }).then(news => {
        res.json(news);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving spacs."
        });
    });
};