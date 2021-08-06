const db = require("../models");


const Op = db.Sequelize.Op;
exports.findAll = (req, res) => {
    const idspac = req.params.idspac;
    db.market.findOne({
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
                message: err.message || "Some error occurred while retrieving Shareholders."
            });
        });
};