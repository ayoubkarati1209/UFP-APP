module.exports = (sequelize, Sequelize) => {
    const datetypes = sequelize.define("datetypes", {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        }
    });

    return datetypes;
};