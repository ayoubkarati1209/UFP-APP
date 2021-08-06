module.exports = (sequelize, Sequelize) => {
    const Trusts = sequelize.define("trusts", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        ipo_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        ipo_price: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ipo_issuance: {
            type: Sequelize.STRING,
            allowNull: false
        },
        combination_months: {
            type: Sequelize.STRING,
            allowNull: false
        },
        extendable: {
            type: Sequelize.STRING,
            allowNull: false
        },
        units_over_warrents: {
            type: Sequelize.STRING,
            allowNull: false
        },
        recent_cash: {
            type: Sequelize.STRING,
            allowNull: false
        },
        recent_shares: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        split_date: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        spac_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Trusts;
};