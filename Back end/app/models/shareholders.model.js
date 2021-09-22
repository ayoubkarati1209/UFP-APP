module.exports = (sequelize, Sequelize) => {
    const Shareholders = sequelize.define("shareholders", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        fund_name: {
            type: Sequelize.STRING(150),
            allowNull: true
        },
        shares: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        percentage: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Shareholders;
};