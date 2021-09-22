module.exports = (sequelize, Sequelize) => {
    const Warrant_info = sequelize.define("warrant_info", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        strike: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        multiplier: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        first_exercise: {
            type: Sequelize.DATE,
            allowNull: true
        },
        expiration: {
            type: Sequelize.DATE,
            allowNull: true
        },
        delta: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        vol: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Warrant_info;
};