module.exports = (sequelize, Sequelize) => {
    const Trusts = sequelize.define("trusts", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        ipo_price: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        ipo_issuance: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        extendable: {
            type: Sequelize.STRING,
            allowNull: true
        },
        units_over_warrents: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        recent_cash: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        recent_shares: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Trusts;
};