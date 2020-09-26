'use strict'

describe('token authentication module test', () => {
    const tokenAuth = require('../src/token-auth');
    const payload = { userId: 1, role: 1};

    test('token sign test', () => {
        const expiresIn = 60 * 60;   // 3600 sec = 1 hour
        const token = tokenAuth.sign(payload, expiresIn);
        
        expect(typeof token).toBe('string');
        expect(token.length > 0).toBeTruthy();
    });
    
    test('token verify test', () => {
        const expiresIn = 60 * 60;   // 3600 sec = 1 hour
        const token = tokenAuth.sign(payload, expiresIn);
        const result = tokenAuth.verify(token);

        expect(payload).toEqual(result);
    });    

    test('token expiration test', () => {
        const expiresIn = -1;
        const token = tokenAuth.sign(payload, expiresIn);
        const result = tokenAuth.verify(token);

        expect(result).toEqual(undefined);
    });
});