const { tickers } = require("../models");
const db = require("../models");
const Spacs = db.spacs;
const Op = db.Sequelize.Op;
const getPagination = (page, size) => {
    const limit = size ? +size : 15;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: admin_detail } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, admin_detail, totalPages, currentPage };
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Shareholders
    const spacs = {
        name: req.body.name,
        cik: req.body.cik,
    };

    // Save Shareholders in the database
    Spacs.create(spacs)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Shareholders."
            });
        });
};

// Retrieve all shareholders from the database.
exports.findAll = (req, res) => {

    Spacs.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Shareholders."
            });
        });
};
exports.findAllPage = (req, res) => {
    const { page, size, name } = req.query;
    var condition = name ? {
        name: {
            [Op.name]: `%${name}%`
        }
    } : null;

    const { limit, offset } = getPagination(page, size);

    Spacs.findAndCountAll({
            where: condition,
            limit,
            offset,
            include: [{
                    model: db.tickers.findOne({
                        where:{id=2}
                    })
                }, {
                    model: db.overviews
                },
                {
                    model: db.tickers
                }
            ]
        })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Shareholders."
            });
        });
};
exports.findOne = (req, res) => {
    const idspac = req.params.idspac;

    Spacs.findByPk(idspac)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Spac with idnews=" + idspac
            });
        });
};