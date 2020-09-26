'use strict';
const tokenAuth = require('../token-auth');
const userDal = require('../dal/user.dal');
const { roles } = require('../enums');
const cipher = require('../cipher');

const register = async function(req, res) {
    const user = await userDal.insert(req.body.User, roles.User);
    const {Password, ...userWithoutPassword} = user;
    const {LastName, FirstName, ...fieldsForEncryption} = user;
    const encryptedUserFields = tokenAuth.sign(fieldsForEncryption, 60 * 5);

    res.statusCode = 200;
    return { 
        auth: true, 
        token: encryptedUserFields, 
        user: userWithoutPassword
    };
}

const login = async function(req, res) {
    const user = await userDal.getByMobile(req.body.User);

    if(user.Password && (req.body.User.Password === cipher.decrypt(user.Password))) {
        const {Password, ...userWithoutPassword} = user;
        const {LastName, FirstName, ...fieldsForEncryption} = user;
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
