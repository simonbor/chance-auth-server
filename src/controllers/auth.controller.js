'use strict';
const tokenAuth = require('../auth-token');
const userDal = require('../dal/user.dal');
const { roles } = require('../enums');
const cipher = require('../cipher');

const register = async function(req, res) {
    const user = await userDal.insert(req.body.User, roles.User);

    if(user.UserId > 0) {
        const {Password, ...userWithoutPassword} = user;
        const {LastName, FirstName, ...fieldsForEncryption} = req.body.User;
        const encryptedUserFields = tokenAuth.sign(fieldsForEncryption, 60 * 5);

        res.statusCode = 200;
        return { 
            auth: true, 
            token: encryptedUserFields, 
            user: userWithoutPassword
        };
    }

    res.statusCode = 500;
    return { 
        auth: false,
        message: 'Error occurred while registration'
    };
}

const login = async function(req, res) {
    const user = await userDal.getByMobile(req.body.User);

    if(user.Password && (req.body.User.Password === cipher.decrypt(user.Password))) {
        const {Password, ...userWithoutPassword} = user;
        const {LastName, FirstName, ...fieldsForEncryption} = req.body.User;
        const encryptedUserFields = tokenAuth.sign(fieldsForEncryption, 60 * 5);

        res.statusCode = 200;
        return { 
            auth: true,
            token: encryptedUserFields,
            user: userWithoutPassword
        };
    }

    res.statusCode = 400;
    return { 
        auth: false,
        message: 'Username or password is incorrect'
    };
}

module.exports = { register, login }
