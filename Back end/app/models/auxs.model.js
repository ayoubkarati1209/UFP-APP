module.exports = (sequelize, Sequelize) => {
    const Aux = sequelize.define("aux", {
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
        admin_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Aux;
};