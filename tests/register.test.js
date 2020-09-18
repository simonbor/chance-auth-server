'use strict'
// const addressController = require('../src/controllers/addressController');
// const DbContext = require('../src/dal/dal-context/dbContext')

describe('location controller tests', () => {
  const mockRequest = () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
  }; 
  const mockResponse = () => {
    const res = {}
    res.send = jest.fn().mockReturnValue(res)
    res.statusCode = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res;
  };
  const req = mockRequest();

  beforeAll(async (done) => {
    // init database (mssql, postgres)
    DbContext.initContext();

    // wait for db recreation
    // setTimeout(function() {done()}, DB_RECREATE_DELAY);
  });
  beforeEach(async () => {
    // req.body = {
    //   "Address": {
    //     "CityId": 1,
    //     "CountryId": 367,
    //     "Building": 1
    //   }
    // }
  });

  test('test address read - empty address use case', async () => {
    const res = mockResponse();

    req.body.Address.StreetName = 'Bograshov';

    const address = await addressController.addressGet(req, res);
    expect(address.AddressId === undefined).toBeTruthy()
    expect(res.statusCode).toEqual(200);
    expect(typeof address).toBe('object');
  });

});