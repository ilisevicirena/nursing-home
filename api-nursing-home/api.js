require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
const { authenticateToken } = require("./routes/token"); // Import functions from token.js
const { sendTestEmail } = require("./routes/email");

var app = express();
var router = express.Router();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  }),
);

// Require route handlers
const authentication = require("./routes/authentication");
const floors = require("./routes/floors");
const rooms = require("./routes/rooms");
const persons = require("./routes/persons");
const contacts = require("./routes/contacts");
const genders = require("./routes/genders");
const services = require("./routes/services");
const packages = require("./routes/packages");
const discounts = require("./routes/discounts");
const servicesMangement = require("./routes/services-management");
const measureUnits = require("./routes/measure-units");
const priceUnits = require("./routes/price-units");
const notifications = require("./routes/notifications");
const documents = require("./routes/documents");
const notes = require("./routes/notes");
const tags = require("./routes/tags");
const events = require("./routes/events");
const calculation = require("./routes/calculation");
const summary = require("./routes/summary");
const accommodationPdfRequest = require("./routes/accomodation-pdf-request");
const countries = require("./routes/countries");
const municipalities = require("./routes/municipalities");
const cities = require("./routes/cities");
const healthConditions = require("./routes/health-conditions");
const accommodationTypes = require("./routes/accommodation-types");
const personCategories = require("./routes/person-categories");
const qualifications = require("./routes/qualifications");
const jobPositions = require("./routes/job-positions");
const employmentTypes = require("./routes/employment-types");
const employees = require("./routes/employees");
const vacations = require("./routes/vacations");
const doctorVisits = require("./routes/doctor-visits");
const furnitureStatuses = require("./routes/furniture-statuses");
const furniture = require("./routes/furniture");
const generalSettings = require("./routes/general-settings");
const users = require("./routes/users");
const myProfile = require("./routes/my-profile");
const personAllergens = require("./routes/person-allergens");
const personMedications = require("./routes/person-medications");
const personFunctionalStatus = require("./routes/person-functional-status");
const personDietaryRestrictions = require("./routes/person-dietary-restrictions");
const personInsurance = require("./routes/person-insurance");
const carePlan = require("./routes/care-plan");
const medicationAdministration = require("./routes/medication-administration");
const auditLog = require("./routes/audit-log");

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Register the authentication route without global middleware
app.use("/authentication", authentication);

// Apply authentication middleware globally for /api routes
app.use("/api", authenticateToken, router);

// Register other routes under /api
router.use("/floors", floors);
router.use("/rooms", rooms);
router.use("/persons", persons);
router.use("/contacts", contacts);
router.use("/genders", genders);
router.use("/services", services);
router.use("/packages", packages);
router.use("/discounts", discounts);
router.use("/services-management", servicesMangement);
router.use("/measure-units", measureUnits);
router.use("/price-units", priceUnits);
router.use("/notifications", notifications);
router.use("/documents", documents);
router.use("/notes", notes);
router.use("/tags", tags);
router.use("/events", events);
router.use("/calculation", calculation);
router.use("/summary", summary);
router.use("/accommodation-pdf-request", accommodationPdfRequest);
router.use("/countries", countries);
router.use("/municipalities", municipalities);
router.use("/cities", cities);
router.use("/health-conditions", healthConditions);
router.use("/person-categories", personCategories);
router.use("/accommodation-types", accommodationTypes);
router.use("/qualifications", qualifications);
router.use("/job-positions", jobPositions);
router.use("/employment-types", employmentTypes);
router.use("/employees", employees);
router.use("/vacations", vacations);
router.use("/doctor-visits", doctorVisits);
router.use("/furniture-statuses", furnitureStatuses);
router.use("/furniture", furniture);
router.use("/general-settings", generalSettings);
router.use("/users", users);
router.use("/person-allergens", personAllergens);
router.use("/person-medications", personMedications);
router.use("/person-functional-status", personFunctionalStatus);
router.use("/person-dietary-restrictions", personDietaryRestrictions);
router.use("/person-insurance", personInsurance);
router.use("/care-plan", carePlan);
router.use("/medication-administration", medicationAdministration);
router.use("/audit-log", auditLog);
router.use("/my-profile", myProfile);

// Start the server
const server = app.listen(process.env.PORT || 8090, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
