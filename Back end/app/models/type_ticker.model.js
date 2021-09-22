module.exports = (sequelize, Sequelize) => {
    const type_ticker = sequelize.define("type_ticker", {
        id: {
            type: Sequelize.STRING(50),
            allowNull: false,
            primaryKey: true,
        }
    });

    return type_ticker;
};