module.exports = (sequelize, Sequelize) => {
    const Aux = sequelize.define("auxs", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        cik: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return Aux;
};