'use strict';

class User {
	constructor({UserId, RoleId, Email, Password, FirstName, LastName, MobileNum, Updated, Created}) {
        this.UserId =       UserId;
        this.RoleId =       RoleId;
        this.Email =        Email;
        this.Password =     Password;
        this.FirstName =    FirstName;
        this.LastName =     LastName;
        this.MobileNum =    MobileNum;
        this.Created =      Created;
        this.Updated =      Updated;
    }
}

module.exports = { User }