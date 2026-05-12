class EmailMessage {
  constructor(email, subject, message, appUrl, brand, userId) {
    this.Email = email;
    this.Subject = subject;
    this.Message = message;
    this.AppUrl = appUrl;
    this.Brand = brand;
    this.UserId = userId;
  }
}

module.exports = {
  EmailMessage,
};
