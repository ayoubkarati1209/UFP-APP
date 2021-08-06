module.exports = (sequelize, Sequelize) => {
    const MarketType = sequelize.define("markettype", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        type_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return MarketType;
};