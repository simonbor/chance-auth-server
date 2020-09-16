'use strict';
const DbContext = require('./dal-context/dbContext');
const { GetCityReq, City } = require('../models/city');

const cityGet = async function(address) {
    const dbContext = new DbContext();

    const req = new GetCityReq(address);
    let cityData = await dbContext.execute('main."sp_GetCity"', req);
    const city = new City(cityData[0][0] || cityData[0])

    return city;
}

module.exports = { cityGet }