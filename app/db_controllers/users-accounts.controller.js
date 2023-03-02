
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
    condition1 = { type: 4 }
    const smallScale = await Users_accounts.findAll( {where: condition1});
    const mediumScale = await Users_accounts.findAll( {where: condition1});
    const largeScale = await Users_accounts.findAll( {where: condition1});
    const tradersWithNoPicture = await Users_accounts.findAll( {where: condition1});
    const traders = await Users_accounts.findAll( {where: condition1});

    let data = [];
    data = {'Number of Small Scale: ': smallScale.length}
    
    res.send(data);
};
