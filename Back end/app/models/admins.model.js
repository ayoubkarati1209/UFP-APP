module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admins", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        incorporation: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Admin;
};