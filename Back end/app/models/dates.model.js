module.exports = (sequelize, Sequelize) => {
    const dates = sequelize.define("dates", {
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
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return dates;
};