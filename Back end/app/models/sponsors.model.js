module.exports = (sequelize, Sequelize) => {
    const Spac = sequelize.define("sponsors", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        cik: {
            type: Sequelize.STRING(45),
            allowNull: true
        }
    });

    return Spac;
};