const { overviews } = require("../models");
const db = require("../models");
const News = db.news;
const Spacs = db.spacs;

const Op = db.Sequelize.Op;
exports.findAll = (req, res) => {

    const { page, size, name } = req.query;
    const spac_id = req.params.spac_id;
    db.overviews.findOne({
        where: { spac_id: spac_id },
        include: [{

                model: db.industries
            },
            {
                model: db.targets
            }


        ]
    }).then(news => {
        res.json(news);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving spacs."
        });
    });
};