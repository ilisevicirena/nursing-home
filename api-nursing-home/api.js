const express = require("express");

var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var router = express.Router();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use("/api", router);

// require route handlers.
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

// register routes
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

// No need to connect the pool
// Just start the web server
const server = app.listen(process.env.PORT || 8090, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
