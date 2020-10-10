'use strict';

class User {
	constructor({UserId, RoleId, Email, Password, FirstName, LastName, MobileNum}) {
        this.UserId =       UserId;
        this.RoleId =       RoleId;
        this.MobileNum =    MobileNum;
        this.Password =     Password;
        this.Email =        Email;
        this.FirstName =    FirstName;
        this.LastName =     LastName;
    }
}

module.exports = { User }