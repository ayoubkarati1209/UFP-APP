module.exports = (sequelize, Sequelize) => {
    const Warrant_info = sequelize.define("warrant_info", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        strike: {
            type: Sequelize.STRING,
            allowNull: false
        },
        multiplier: {
            type: Sequelize.STRING,
            allowNull: false
        },
        first_exercise: {
            type: Sequelize.DATE,
            allowNull: false
        },
        expiration: {
            type: Sequelize.DATE,
            allowNull: false
        },
        delta: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vol: {
            type: Sequelize.STRING,
            allowNull: false
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Warrant_info;
};