const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { authenticateToken } = require("./token");
const { generateToken } = require("./token");
const {
  LoginInfo,
  ResetPasswordInfo,
  SetPasswordInfo,
} = require("../models/User");
const { sendEmail } = require("./email");
const { EmailMessage } = require("../models/Email");
const { format } = require("date-fns");

router.post("/login", async (req, res) => {
  var objectToSave = Object.assign(new LoginInfo(), req.body);

  if (!objectToSave.Identifier || !objectToSave.Password) {
    return res.status(400).send("Username/email and password are required.");
  }

  try {
    const pool = await db;

    const authResult = await pool
      .request()
      .input("Identifier", objectToSave.Identifier)
      .input("Password", objectToSave.Password)
      .execute("authenticateUser");

    const {
      Authenticated,
      UserId,
      Message,
      FirstName,
      LastName,
      Email,
      Username,
      DateRegistered,
    } = authResult.recordset[0];

    if (Authenticated) {
      // Generate JWT token
      const token = generateToken(UserId);

      // Fetch roles and permissions
      const rolesPermissionsResult = await pool
        .request()
        .input("UserId", UserId)
        .execute("getUserRolesAndPermissions");

      const roles = rolesPermissionsResult.recordsets[0];
      const permissions = rolesPermissionsResult.recordsets[1];

      // Fetch user persons
      const personsResult = await pool
        .request()
        .input("UserId", UserId)
        .execute("getPersonsForUser");

      const persons = personsResult.recordset.map((x) => x.Id);

      // Log user activity
      await pool
        .request()
        .input("UserId", UserId)
        .input("ActivityType", "LOGIN")
        .input("Timestamp", new Date())
        .execute("insertUserActivity");

      await pool
        .request()
        .input("UserId", UserId)
        .execute("dailyNotificationCheck");

      res.json({
        Authenticated,
        UserId,
        User: {
          Id: UserId,
          FirstName: FirstName,
          LastName: LastName,
          Email: Email,
          Username: Username,
          DateRegistered: DateRegistered,
        },
        Token: token,
        Roles: roles,
        Permissions: permissions,
        Persons: persons,
      });
    } else if (Message)
      res.status(401).send("NURSNIG_HOME_AUTH_ERR#" + Message);
    else res.status(401).send("Authorization failed");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to get user roles
router.get("/roles", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;

    const pool = await db();
    const result = await pool
      .request()
      .input("UserId", userId)
      .execute("getUserRoles");

    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to get user permissions
router.get("/permissions", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;

    const pool = await db();
    const result = await pool
      .request()
      .input("UserId", userId)
      .execute("getUserPermissions");

    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to handle logout
router.post("/logout", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Log user activity for logout
    const pool = await db;
    await pool
      .request()
      .input("UserId", userId)
      .input("ActivityType", "LOGOUT")
      .input("Timestamp", new Date())
      .execute("insertUserActivity");

    res.status(200).json("Logout successful");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to handle reset password
router.post("/resetPassword", authenticateToken, async (req, res) => {
  try {
    var objectToSave = Object.assign(new ResetPasswordInfo(), req.body);

    const pool = await db;
    const authResult = await pool
      .request()
      .input("UserId", objectToSave.UserId)
      .input("OldPassword", objectToSave.OldPassword)
      .input("NewPassword", objectToSave.NewPassword)
      .execute("resetPassword");

    const { Success, Message } = authResult.recordset[0];

    if (Success) {
      // Log user activity
      await pool
        .request()
        .input("UserId", objectToSave.UserId)
        .input("ActivityType", "PASSWORD_RESET")
        .input("Timestamp", new Date())
        .execute("insertUserActivity");

      res.status(200).json("Reset password successful");
    } else if (Message)
      res.status(401).send("NURSNIG_HOME_AUTH_ERR#" + Message);
    else res.status(401).send("Authorization failed");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to handle forgot password
router.post("/forgotPassword", async (req, res) => {
  try {
    var objectToSave = Object.assign(new EmailMessage(), req.body);

    const pool = await db;
    const authResult = await pool
      .request()
      .input("Email", objectToSave.Email)
      .execute("forgotPassword");

    const { Success, Message, UserId, Token, ExpiryDate, Email } =
      authResult.recordset[0];

    if (Success) {
      objectToSave.Message = objectToSave.Message.replace(
        "#ExpiryDate",
        format(new Date(ExpiryDate), "dd.MM.yyyy HH:mm")
      );
      objectToSave.Message = objectToSave.Message.replaceAll(
        "#SetNewPasswordAppLink",
        objectToSave.AppUrl + "?token=" + Token
      );
      objectToSave.Message = objectToSave.Message.replace(
        "#EnvironmentBrand",
        objectToSave.Brand
      );

      sendEmail(Email, objectToSave.Subject, objectToSave.Message);
      res.status(200).json("Reset password successful");
    } else if (Message)
      res.status(401).send("NURSNIG_HOME_AUTH_ERR#" + Message);
    else res.status(401).send("Authorization failed");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/setPassword", async (req, res) => {
  try {
    var objectToSave = Object.assign(new SetPasswordInfo(), req.body);

    const pool = await db;
    const authResult = await pool
      .request()
      .input("Token", objectToSave.Token)
      .input("NewPassword", objectToSave.NewPassword)
      .execute("resetPasswordFromForgot");

    const { Success, Message } = authResult.recordset[0];

    if (Success) res.status(200).json("Reset password successful");
    else if (Message) res.status(401).send("NURSNIG_HOME_AUTH_ERR#" + Message);
    else res.status(401).send("Authorization failed");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
