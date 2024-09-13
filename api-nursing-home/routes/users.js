const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { User } = require("../models/User");
const { generatePassword } = require("../resources/functions");
const { EmailMessage } = require("../models/Email");
const { format } = require("date-fns");
const { sendEmail } = require("./email");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().execute("getAllUsers");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new User(), request.body);
    var password = generatePassword(10);

    const pool = await db;
    const result = await pool
      .request()
      .input("FirstName", objectToSave.FirstName)
      .input("LastName", objectToSave.LastName)
      .input("Username", objectToSave.Username)
      .input("Password", password)
      .input("Email", objectToSave.Email)
      .execute("insertUser");

    const { Message, Success } = result.recordset[0];

    if (Success) {
      var user = result.recordset[0];
      if (user.UserId && objectToSave.ContactId) {
        await pool
          .request()
          .input("UserId", user.UserId)
          .input("ContactId", objectToSave.ContactId)
          .execute("insertUserContactRelation");
      }

      var user = result.recordset[0];
      if (user.UserId && objectToSave.EmployeeId) {
        await pool
          .request()
          .input("UserId", user.UserId)
          .input("EmployeeId", objectToSave.EmployeeId)
          .execute("insertUserEmployeeRelation");
      }

      response.json(user);
    } else if (Message)
      response.status(401).send("NURSNIG_HOME_AUTH_ERR#" + Message);
    else response.status(401).send("Authorization failed");
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new User(), request.body);

    const pool = await db;
    const result = await pool
      .request()
      .input("UserId", objectToSave.Id)
      .input("FirstName", objectToSave.FirstName)
      .input("LastName", objectToSave.LastName)
      .input("Username", objectToSave.Username)
      .input("Email", objectToSave.Email)
      .execute("updateUser");
    if (result != null) response.json(result.recordset);
    else response.send("errr");
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/changeUserRole", async (request, response) => {
  try {
    var objectToSave = request.body;

    const pool = await db;
    const result = await pool
      .request()
      .input("UserId", objectToSave.Id)
      .input("RoleId", objectToSave.RoleId)
      .execute("changeUserRole");
    if (result != null) response.json(result.recordset);
    else response.send("errr");
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getUserData", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("UserId", request.query.UserId)
      .execute("getUserData");
    response.json({
      User: result.recordsets[0][0],
      Roles: result.recordsets[1],
    });
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/roles", async (req, res) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("UserId", request.query.UserId)
      .execute("getUserRolesAndPermissions");
    res.json({
      Roles: result.recordsets[0],
      Permissions: result.recordsets[1],
    });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get("/getRoles", async (req, response) => {
  try {
    const pool = await db;
    const result = await pool.request().execute("getRoles");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/checkVerificationTokenForUser", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("UserId", request.query.UserId)
      .execute("checkVerificationTokenForUser");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/sendVerificationEmail", async (req, res) => {
  try {
    var objectToSave = Object.assign(new EmailMessage(), req.body);

    const pool = await db;
    const authResult = await pool
      .request()
      .input("UserId", objectToSave.UserId)
      .execute("generateVerifyUserToken");

    const { Token, ExpiryDate, CreationDate } = authResult.recordset[0];

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

    sendEmail(objectToSave.Email, objectToSave.Subject, objectToSave.Message);
    res.status(200).json("Verify user email successfully sent");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/blockUnblockUser", async (request, response) => {
  try {
    var objectToSave = request.body;

    const pool = await db;
    const result = await pool
      .request()
      .input("UserId", objectToSave.Id)
      .input("Blocked", objectToSave.Blocked)
      .execute("blockUnblockUser");
    if (result != null) response.json(result.recordset);
    else response.send("errr");
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/activateDeactivateUser", async (request, response) => {
  try {
    var objectToSave = request.body;

    const pool = await db;
    const result = await pool
      .request()
      .input("UserId", objectToSave.Id)
      .input("Active", objectToSave.Active)
      .execute("activateDeactivateUser");
    if (result != null) response.json(result.recordset);
    else response.send("errr");
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
