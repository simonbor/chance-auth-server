// const jwt = require('jsonwebtoken');
const cipher = require('./cipher');
// const config = require('./config');

const sign = function(payload, expiresIn) { // expiresIn - in seconds 
    // const token = jwt.sign(payload, config.secret, expiredAt);

    const pl = JSON.parse(JSON.stringify(payload));
    pl.expiresIn = Math.floor((Date.now() / 1000) + expiresIn);
    const token = cipher.encrypt(JSON.stringify(pl));

    return token;
}

const verify = function(token) {
    const payload = JSON.parse(cipher.decrypt(token));
    const now = Math.floor(Date.now() / 1000);

    if(payload.expiresIn && now > payload.expiresIn) {
        console.error('Error: token expired');
        return;
    }

    delete payload.expiresIn;
    return payload;
}

module.exports = { sign, verify }