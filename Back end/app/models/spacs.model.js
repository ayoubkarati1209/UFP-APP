module.exports = (sequelize, Sequelize) => {
    const Spac = sequelize.define("spacs", {
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
        }
    });

    return Spac;
};