'use strict';
const HmClient = require('./hmClient');
const MockClient = require('./mockClient');

// Dependency Injection approach inspired from the article -
// https://medium.com/javascript-in-plain-english/does-dependency-injection-have-a-place-in-javascript-37831c204a0b
module.exports = class HmContext {
    static initContext() {
        const hmClient = new HmClient();
        const mockClient = new MockClient();

        HmContext.prototype.getLocation = process.env.NODE_ENV == 'test' ? mockClient.getLocation : hmClient.getLocation;
    }
    
    // should be overridden by derived classes at app start - HmContext.initContext()
    getLocation(path) {
        throw new Error('always use HmContext.initContext() before process start');
    }
}