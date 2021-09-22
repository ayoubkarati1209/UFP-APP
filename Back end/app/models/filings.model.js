module.exports = (sequelize, Sequelize) => {
    const Filing = sequelize.define("filings", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        type: {
            type: Sequelize.STRING(150),
            allowNull: true
        },
        link: {
            type: Sequelize.STRING(150),
            allowNull: true
        },
        title: {
            type: Sequelize.STRING(150),
            allowNull: true
        },
        description: {
            type: Sequelize.STRING(150),
            allowNull: true
        },
        image_link: {
            type: Sequelize.STRING(150),
            allowNull: true
        },
        ref: {
            type: Sequelize.STRING(150),
            allowNull: true
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Filing;
};