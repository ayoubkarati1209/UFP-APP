module.exports = (sequelize, Sequelize) => {
    const Spac = sequelize.define("spacs", {
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
        id_sponsor:{
            type:Sequelize.INTEGER,
            is_hot_lis:Sequelize.INTEGER
        },
        is_hot_list:{
            type:Sequelize.INTEGER,
            is_hot_lis:Sequelize.INTEGER
        }
    });

    return Spac;
};