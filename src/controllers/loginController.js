const jwt = require('jsonwebtoken');
const driverDal = require('../dal/driverDal');

const driverGet = async (req, res) => {
    const driver = await driverDal.driverGet(req.body.Driver);
    if (!driver.DriverId) {
        res.statusCode = 401;
        return { auth: false, user: {}, token: null };
    }
    
    const secret = process.env.CRYPTO_KEY || 'secretPassword';
    const token = jwt.sign({ id: driver.DriverId }, secret, { expiresIn: 600 }); // expires in 10 mins
    
    res.statusCode = 200;
    return { auth: true, user: JSON.stringify(driver), token: token };
}

module.exports = { driverGet }