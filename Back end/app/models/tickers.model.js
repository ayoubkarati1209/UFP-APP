module.exports = (sequelize, Sequelize) => {
    const Tickers = sequelize.define("tickers", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        unit_ticker: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        common_stock_ticker: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        warrant_ticker: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        target_stock: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        target_warrant: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Tickers;
};