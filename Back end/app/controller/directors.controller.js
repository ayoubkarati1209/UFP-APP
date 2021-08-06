const db = require("../models");
const directors = db.directors;
const Spacs = db.spacs;

const Op = db.Sequelize.Op;
exports.findAll = (req, res) => {
    const idspac = req.params.idspac;
    directors.findAll({ where: { spac_id: idspac } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Shareholders."
            });
        });
};