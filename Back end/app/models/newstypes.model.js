module.exports = (sequelize, Sequelize) => {
    const NewsTypes = sequelize.define("newstypes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false
        },
        reg_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
    });

    return NewsTypes;
};