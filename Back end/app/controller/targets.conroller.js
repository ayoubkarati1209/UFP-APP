const db = require("../models");
const Targets = db.targets;
const Op = db.Sequelize.Op;
exports.findOne = (req, res) => {
    const id = req.params.id;

    Targets.findOne({
            where: { id_overviews: id }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving targets with idover=" + id
            });
        });
};