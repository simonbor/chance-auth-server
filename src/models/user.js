'use strict';

class User {
	constructor({UserId, RoleId, Email, Password, FirstName, LastName, MobileNum, Updated, Created}) {
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