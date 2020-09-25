'use strict';
const PsqlContext = require('./psql-context');

// Dependency Injection approach inspired from the article -
// https://medium.com/javascript-in-plain-english/does-dependency-injection-have-a-place-in-javascript-37831c204a0b
module.exports = class DbContext {
    static initContext() {
        const psqlContext = new PsqlContext();
        
        DbContext.prototype.execute = psqlContext.execute;
        DbContext.prototype.query = psqlContext.query;
    }
    
    query(query, reqParams) {
        // always overridden by derived classes at app start - DbContext.initContext()
        throw new Error('use DbContext.initContext() at app start');
    }
    execute(procedureName, reqParams) {
        // always overridden by derived classes at app start - DbContext.initContext()
        throw new Error('use DbContext.initContext() at app start');
    }
}