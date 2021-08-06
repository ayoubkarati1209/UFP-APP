module.exports = (sequelize, Sequelize) => {
    const AuxType = sequelize.define("auxtype", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return AuxType;
};