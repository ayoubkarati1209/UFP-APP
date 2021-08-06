module.exports = (sequelize, Sequelize) => {
    const Uploads = sequelize.define("uploads", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        news_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        file: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false
        },


    });

    return Uploads;
};