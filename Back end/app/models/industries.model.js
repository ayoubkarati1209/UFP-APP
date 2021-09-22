module.exports = (sequelize, Sequelize) => {
    const Industry = sequelize.define("industries", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        sic_number: {
            type: Sequelize.STRING(45),
            allowNull: false
        }
    });

    return Industry;
};