const db = require("../models");
const filings = db.filings;
const Spacs = db.spacs;

const Op = db.Sequelize.Op;
exports.findOne = (req, res) => {
    const idspac = req.params.idspac;

    filings.findOne({
            where: { spac_id: idspac },
            order: [
                ['date', 'DESC']
            ],
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Spac with idnews=" + idnews
            });
        });
};
exports.findAll = (req, res) => {
    const idspac = req.params.idspac;
    filings.findAll({
            where: { spac_id: idspac },
            order: [
                ['date', 'DESC']
            ]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Shareholders."
            });
        });
};