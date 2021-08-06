module.exports = (sequelize, Sequelize) => {
    const Targets = sequelize.define("targets", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cik: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_overviews: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });

    return Targets;
};