module.exports = (sequelize, Sequelize) => {
    const Director = sequelize.define("directors", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(150),
            allowNull: true
        },
        position: {
            type: Sequelize.STRING(150),
            allowNull: true
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cik: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Director;
};