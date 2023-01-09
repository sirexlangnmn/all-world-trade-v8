const { v4: uuidV4 } = require('uuid');
const CryptoJS = require('crypto-js');
const JWT_SECRET = process.env.JWT_SECRET;
const db = require('../db_models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Support_links = db.support_links;

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    const encryptedUuid = req.session.user.uuid;
    const bytes = CryptoJS.AES.decrypt(encryptedUuid, JWT_SECRET);
    const originalUuid = bytes.toString(CryptoJS.enc.Utf8);

    const communicator_link = uuidV4();

    const linkObject = {
        communicator_link: communicator_link + '-all-world-trade-help-suggestion',
        support_accounts_uuid: originalUuid,
        isOccupied: 0,
        status: 0
    };

    const updateObject = {
        status: 2,
    };

    const getObject = {
        support_accounts_uuid: originalUuid,
        status: 0,
    };

    var condition = originalUuid ? { support_accounts_uuid: { [Op.like]: `%${originalUuid}%` }, status: 0 } : null;

    const getRows = await Support_links.findAll({ where: condition })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log('Some error occurred while retrieving tutorials.');
            return 'Some error occurred while retrieving tutorials.';
        });

    let updatedRows;
    if (getRows.length > 0) {
        updatedRows = await Support_links.update(updateObject, {
            where: { support_accounts_uuid: originalUuid, status: 0 }, // statsu 2 = not used communicaotr link
        })
            .then((num) => {
                if (num > 0) {
                    console.log('updated successfully');
                    return num;
                } else {
                    console.log('Some error occurred while updating the help and suggest communicator link status');
                }
            })
            .catch((err) => {
                console.log('Error updating help and suggest communicator link status with uuid=' + originalUuid);
            });
    }

    if (getRows.length > 0 || updatedRows > 0) {
        Support_links.create(linkObject)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred while creating the help and suggest communicator link.',
                });
            });
    } else {
        Support_links.create(linkObject)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred while creating the help and suggest communicator link.',
                });
            });
    }
};



exports.getSupportLinks = async (req, res) => {
    const encryptedUuid = req.session.user.uuid;
    const bytes = CryptoJS.AES.decrypt(encryptedUuid, JWT_SECRET);
    const originalUuid = bytes.toString(CryptoJS.enc.Utf8);

    var condition = { isOccupied: 0, status: 0 };

    const getRows = await Support_links.findAll({ 
        limit: 1,
        where: condition,
        order: [ [ 'createdAt', 'DESC' ]]
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving tutorials.';
        });

};