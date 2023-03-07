const db = require('../db_models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Users_accounts = db.users_accounts;

const Op = db.Sequelize.Op;

exports.numberOfVisitorMembers = async (req, res) => {
    const getRows = await Users_accounts.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving number Of Trader Members.';
        });
};

exports.tradersData = async (req, res) => {
    // condition1 = { type: 4, type: 3, type: 2, type: 1 }
    traders = { type: 1 };
    large_scale = { type: 2 };
    medium_scale = { type: 3 };
    small_scale = { type: 4 };

    const smallScale = await Users_accounts.findAll({ where: small_scale });
    const mediumScale = await Users_accounts.findAll({ where: medium_scale });
    const largeScale = await Users_accounts.findAll({ where: large_scale });
    // const tradersWithNoPicture = await Users_accounts.findAll( {where: condition1});
    const Alltraders = await Users_accounts.findAll({ where: traders });

    let data = [];
    data = {
        'Number of Small Scale: ': smallScale.length,
        'Number of Medium Scale: ': mediumScale.length,
        'Number of Large Scale: ': largeScale.length,
        'Number of Trader: ': Alltraders.length,
        'All: ': Alltraders.length + smallScale.length + mediumScale.length + largeScale.length,
    };

    res.send(data);
};
