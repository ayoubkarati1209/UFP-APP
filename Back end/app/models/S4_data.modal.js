module.exports = (sequelize, Sequelize) => {
    const Shareholders = sequelize.define("s4_data", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        mcc: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        pipe: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        fpa: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        backstop: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        max_redshares: {
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