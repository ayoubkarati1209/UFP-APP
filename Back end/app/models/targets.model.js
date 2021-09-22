module.exports = (sequelize, Sequelize) => {
    const Targets = sequelize.define("targets", {
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
        cik: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });

    return Targets;
};