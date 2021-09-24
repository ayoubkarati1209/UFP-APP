const db = require("../models");
const dates = db.dates;

const Op = db.Sequelize.Op;
exports.findAll = (req, res) => {
    dates.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Shareholders."
            });
        });
};