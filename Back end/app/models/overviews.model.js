module.exports = (sequelize, Sequelize) => {
    const Overviews = sequelize.define("overviews", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        market_cap: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        id_industries: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Overviews;
};