const cipher = require('./cipher');

const sign = function(payload, expiresIn) { // expiresIn - in seconds 
    const pl = JSON.parse(JSON.stringify(payload));
    pl.ExpiresIn = Math.floor((Date.now() / 1000) + expiresIn);
    const token = cipher.encrypt(JSON.stringify(pl));

    return token;
}

const verify = function(token) {
    const payload = JSON.parse(cipher.decrypt(token));
    const now = Math.floor(Date.now() / 1000);

    if(payload.ExpiresIn && now > payload.ExpiresIn) {
        (!process.env.NODE_ENV || (process.env.NODE_ENV && process.env.NODE_ENV != 'test')) &&
        console.error('Error: token expired');
        return;
    }

    delete payload.ExpiresIn;
    return payload;
}

module.exports = { sign, verify }