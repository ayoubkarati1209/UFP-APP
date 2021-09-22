module.exports = (sequelize, Sequelize) => {
    const AuxType = sequelize.define("auxtype", {
        type: {
            type: Sequelize.STRING(45),
            allowNull: false,
            primaryKey: true
        }
    });

    return AuxType;
};