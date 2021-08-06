module.exports = (sequelize, Sequelize) => {
    const Tickers = sequelize.define("tickers", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        unit_ticker: {
            type: Sequelize.STRING,
            allowNull: false
        },
        common_stock_ticker: {
            type: Sequelize.STRING,
            allowNull: false
        },
        warrant_ticker: {
            type: Sequelize.STRING,
            allowNull: false
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Tickers;
};