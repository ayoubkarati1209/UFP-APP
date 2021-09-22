module.exports = (sequelize, Sequelize) => {
    const Spac = sequelize.define("spacs", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(150),
            allowNull: true
        },
        cik: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        id_sponsor:{
            type:Sequelize.INTEGER,
            allowNull: true

        },
        is_hot_list:{
            type:Sequelize.INTEGER,
            allowNull: true
        }
    });

    return Spac;
};