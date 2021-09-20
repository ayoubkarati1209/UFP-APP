module.exports = (sequelize, Sequelize) => {
    const Market = sequelize.define("market", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        price: {
            type: Sequelize.STRING,
            allowNull: false
        },
        volume: {
            type: Sequelize.STRING,
            allowNull: false
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Market;
};