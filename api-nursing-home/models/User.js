class LoginInfo {
  constructor(identifier, password) {
    this.Identifier = identifier;
    this.Password = password;
  }
}

class ResetPasswordInfo {
  constructor(userId, oldPassword, newPassword) {
    this.UserId = userId;
    this.OldPassword = oldPassword;
    this.NewPassword = newPassword;
  }
}

class SetPasswordInfo {
  constructor(token, newPassword) {
    this.Token = token;
    this.NewPassword = newPassword;
  }
}

class User {
  constructor(firstName, lastName, email, username, contactId, employeeId) {
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Email = email;
    this.Username = username;
    this.ContactId = contactId;
    this.EmployeeId = employeeId;
  }
}

module.exports = {
  LoginInfo,
  ResetPasswordInfo,
  SetPasswordInfo,
  User,
};
