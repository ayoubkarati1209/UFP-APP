module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admins", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        address: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        incorporation: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        phone: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Admin;
};