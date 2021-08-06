const { overviews } = require("../models");
const db = require("../models");
const News = db.news;
const Spacs = db.spacs;
var mysql = require('mysql');

const Op = db.Sequelize.Op;
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ufp-bdd"
});
exports.findAllPagination = (req, res) => {
    db.spacs.findAll({
        include: [{
                model: db.tickers
            },
            {
                model: db.overviews,
                include: [{
                    model: db.industries

                }]
            },
            {
                model: db.market
            },
            {
                model: db.trusts
            }


        ]
    }).then(spacs => {

        res.json(spacs)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving spacs."
        });
    });
};

exports.findAll = (req, res) => {

    const { page, size, name } = req.query;
    const idspac = req.params.idspac;

    var condition = name ? {
        name: {
            [Op.name]: `%${name}%`
        }
    } : null;


    db.spacs.findAll({
        where: condition,
        order: [
            ['name', 'ASC']
        ],
        include: [{
                model: db.news
            },
            {
                model: db.admins
            },
            {
                model: db.filings

            }, {
                model: db.directors
            },
            {
                model: db.market
            }, {

                model: db.shareholders
            },
            {
                model: db.tickers
            },
            {
                model: db.tickers
            },
            {
                model: db.trusts
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
exports.spacsticker = (req, res) => {

    const { page, size, name } = req.query;
    const idspac = req.params.idspac;

    var condition = name ? {
        name: {
            [Op.name]: `%${name}%`
        }
    } : null;


    db.spacs.findAll({
        where: condition,
        order: [
            ['name', 'ASC']
        ],
        include: [{
            model: db.tickers,

        }, {
            model: db.overviews
        }]
    }).then(news => {
        res.json(news);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving spacs."
        });
    });
};
exports.findOne = (req, res) => {

    const { page, size, name } = req.query;
    const idspac = req.params.idspac;

    var condition = name ? {
        name: {
            [Op.name]: `%${name}%`
        }
    } : null;


    db.spacs.findOne({
        where: { id: idspac },
        order: [
            ['name', 'ASC']
        ],
        include: [{
                model: db.overviews,
                include: [{
                    model: db.industries
                }]
            },
            {
                model: db.admins
            },{
            model:db.auxs
            },
            {
                model: db.directors

            },
            {
                model: db.market,
                order: [
                    ['date', 'ASC']
                ]
            }, {

                model: db.shareholders
            },
            {

                model: db.warrant_info
            },
            {
                model: db.tickers
            }, {
                model: db.trusts
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
exports.rFind = (req, res) => {

    const { page, size, name } = req.query;
    const idspac = req.params.idspac;

    var condition = name ? {
        name: {
            [Op.name]: `%${name}%`
        }
    } : null;


    db.spacs.findOne({
        where: { id: idspac },
        order: [
            ['name', 'ASC']
        ],
        include: [{
                model: db.overviews,
                include: [{
                    model: db.industries
                }]
            },
            {
                model: db.tickers
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