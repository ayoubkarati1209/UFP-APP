module.exports = (sequelize, Sequelize) => {
    const Shareholders = sequelize.define("shareholders", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        fund_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shares: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        percentage: {
            type: Sequelize.STRING,
            allowNull: false
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Shareholders;
};