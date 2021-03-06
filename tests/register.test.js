'use strict'
const DbContext = require('../src/contexts/db-context/db-context');
const registerController = require('../src/controllers/auth.controller');

describe('register controller tests block', () => {
  const mockRequest = () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
  }; 
  const mockResponse = () => {
    const res = {}
    res.send = jest.fn().mockReturnValue(res);
    res.statusCode = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const req = mockRequest();
  let mobileNum;

  beforeAll(async () => {
    // init database
    DbContext.initContext();
  });
  beforeEach(async () => {
    req.body.User = {}
    mobileNum = Array.from({length: 10}, () => Math.floor(Math.random() * 9)).join('');
  });

  test('test success register use case', async () => {
    const res = mockResponse();

    req.body.User.FirstName = "זהב";
    req.body.User.Email = 'test@test.com';
    req.body.User.MobileNum = mobileNum;
    req.body.User.Password = '1234qwer';

    const response = await registerController.register(req, res);

    expect(res.statusCode).toEqual(200);
    expect(typeof response).toBe('object');
    expect(response.user.UserId > 0).toBeTruthy()
  });

  test('test unsuccess register use case', async () => {
    const res = mockResponse();

    req.body.User.FirstName = "זהב";
    req.body.User.Email = 'test@test.com';
    req.body.User.MobileNum = mobileNum;
    req.body.User.Password = '1234qwer';

    await registerController.register(req, res);
    const response = await registerController.register(req, res);

    expect(res.statusCode).toEqual(500);
    expect(typeof response).toBe('object');
    expect(response.auth).toBeFalsy()
  });
});