module.exports = (sequelize, Sequelize) => {
    const Market = sequelize.define("market", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        price: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        volume: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

    });

    return Market;
};