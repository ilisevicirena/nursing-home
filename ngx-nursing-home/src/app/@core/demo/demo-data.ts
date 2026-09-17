/**
 * DEMO MODE — seeded in-memory backend.
 *
 * When Demo Mode is active (environment.demo + demo.interceptor.ts), API calls never reach the
 * network: the interceptor asks getMock() for a canned response instead. All data is FICTIONAL.
 *
 * Codebook values mirror the database seed (db-nursing-home/insert-tb-*.sql), translated to
 * English because the demo build runs with the English translation file.
 *
 * IMPORTANT — the real API returns SQL recordsets (ARRAYS); many pages read data[0], so "get one"
 * endpoints return single-element arrays. A few endpoints return named-array objects (dashboard,
 * accommodation board) — those shapes are matched exactly. Unmatched GETs fall back to [] and
 * writes echo their body, so the UI never throws.
 */
import { DEMO_PDFS } from "./demo-pdfs";

// =====================================================================================
// CODEBOOKS (English; sets match db-nursing-home/insert-tb-*.sql)
// =====================================================================================
export const GENDERS = [
  { Id: 1, Name: "Male", Tag: "M" },
  { Id: 2, Name: "Female", Tag: "F" },
];

export const COUNTRIES = [
  { Id: 1, Name: "Croatia" },
  { Id: 2, Name: "Bosnia and Herzegovina" },
  { Id: 3, Name: "Slovenia" },
  { Id: 4, Name: "Serbia" },
];

export const MUNICIPALITIES = [
  { Id: 1, Name: "Gornji Grad", CountryId: 1 },
  { Id: 2, Name: "Trešnjevka", CountryId: 1 },
  { Id: 3, Name: "Centar", CountryId: 1 },
];

export const CITIES = [
  { Id: 1, Name: "Zagreb", PostalCode: "10000", CountryId: 1, MunicipalityId: 1 },
  { Id: 2, Name: "Split", PostalCode: "21000", CountryId: 1, MunicipalityId: 3 },
  { Id: 3, Name: "Osijek", PostalCode: "31000", CountryId: 1, MunicipalityId: 2 },
  { Id: 4, Name: "Rijeka", PostalCode: "51000", CountryId: 1, MunicipalityId: 3 },
  { Id: 5, Name: "Varaždin", PostalCode: "42000", CountryId: 1, MunicipalityId: 1 },
];

export const FLOORS = [
  { Id: 1, Name: "Ground floor" },
  { Id: 2, Name: "1st floor" },
  { Id: 3, Name: "2nd floor" },
];

// Width/Height/Top/Left drive the room-management layout canvas
export const ROOMS = [
  { Id: 1, Name: "P-01", FloorId: 1, FloorName: "Ground floor", Capacity: 2, RoomGenderId: 2, Width: 120, Height: 100, Top: 20, Left: 20 },
  { Id: 2, Name: "P-02", FloorId: 1, FloorName: "Ground floor", Capacity: 2, RoomGenderId: null, Width: 120, Height: 100, Top: 20, Left: 160 },
  { Id: 3, Name: "1-01", FloorId: 2, FloorName: "1st floor", Capacity: 3, RoomGenderId: 1, Width: 150, Height: 120, Top: 20, Left: 20 },
  { Id: 4, Name: "1-02", FloorId: 2, FloorName: "1st floor", Capacity: 2, RoomGenderId: 2, Width: 120, Height: 100, Top: 20, Left: 190 },
  { Id: 5, Name: "2-01", FloorId: 3, FloorName: "2nd floor", Capacity: 1, RoomGenderId: 1, Width: 100, Height: 90, Top: 20, Left: 20 },
  { Id: 6, Name: "2-02", FloorId: 3, FloorName: "2nd floor", Capacity: 2, RoomGenderId: null, Width: 120, Height: 100, Top: 20, Left: 140 },
];

// db: Single/Double/Triple room + Day care (capacity 1/2/3/null)
export const ACCOMMODATION_TYPES = [
  { Id: 1, Name: "Single room", Capacity: 1, Price: 900 },
  { Id: 2, Name: "Double room", Capacity: 2, Price: 650 },
  { Id: 3, Name: "Triple room", Capacity: 3, Price: 500 },
  { Id: 4, Name: "Day care", Capacity: null, Price: 300 },
];

// db HealthCondition (8 items)
export const HEALTH_CONDITIONS = [
  { Id: 1, Name: "Mobile" },
  { Id: 2, Name: "Semi-mobile" },
  { Id: 3, Name: "Immobile" },
  { Id: 4, Name: "Dementia" },
  { Id: 5, Name: "Chronic patient" },
  { Id: 6, Name: "Visually impaired" },
  { Id: 7, Name: "Hard of hearing" },
  { Id: 8, Name: "Other" },
];

export const PERSON_CATEGORIES = [
  { Id: 1, Name: "Category 1", Description: "Mobile residents who independently perform daily activities." },
  { Id: 2, Name: "Category 2", Description: "Semi-mobile residents who need help with basic daily activities." },
  { Id: 3, Name: "Category 3", Description: "Immobile residents who require full assistance and care." },
];

export const TAGS = [
  { Id: 1, Name: "Diabetes", Color: "#e74c3c" },
  { Id: 2, Name: "Diet", Color: "#f39c12" },
  { Id: 3, Name: "Allergy", Color: "#8e44ad" },
  { Id: 4, Name: "Physiotherapy", Color: "#27ae60" },
  { Id: 5, Name: "Urgent", Color: "#c0392b" },
];

// db MeasureUnit: Day/Month/Year/Piece (codes day/month/year/unit)
export const MEASURE_UNITS = [
  { Id: 1, Name: "Day", Tag: "day", Code: "day", CalculationUnit: 1 },
  { Id: 2, Name: "Month", Tag: "month", Code: "month", CalculationUnit: 1 },
  { Id: 3, Name: "Year", Tag: "year", Code: "year", CalculationUnit: 1 },
  { Id: 4, Name: "Piece", Tag: "pcs", Code: "unit", CalculationUnit: 0 },
];

export const PRICE_UNITS = [
  { Id: 1, Name: "Monthly", Tag: "mo" },
  { Id: 2, Name: "Daily", Tag: "day" },
  { Id: 3, Name: "Per piece", Tag: "pcs" },
];

// db JobPosition (5 items, with FontAwesome icons)
export const JOB_POSITIONS = [
  { Id: 1, Name: "Cook", Icon: "fas fa-utensils" },
  { Id: 2, Name: "Medical technician", Icon: "fas fa-user-nurse" },
  { Id: 3, Name: "Caregiver", Icon: "fas fa-hand-holding-medical" },
  { Id: 4, Name: "Cleaner", Icon: "fas fa-broom" },
  { Id: 5, Name: "Doctor", Icon: "fas fa-user-md" },
];

// db EmploymentType: fixed-term / permanent
export const EMPLOYMENT_TYPES = [
  { Id: 1, Name: "Fixed-term" },
  { Id: 2, Name: "Permanent" },
];

// db CalculationStatus (Name, StringKey, Color) — exactly 3
export const CALCULATION_STATUSES = [
  { Id: 1, Name: "Paid", StringKey: "calculationPaid", Color: "success" },
  { Id: 2, Name: "Not paid", StringKey: "calculationNotPaid", Color: "danger" },
  { Id: 3, Name: "Cancelled", StringKey: "calculationCancelled", Color: "warning" },
];

// db AllergenSeverity (Low/Medium/High, Nebular status colors)
export const ALLERGEN_SEVERITIES = [
  { Id: 1, Name: "Low", StringKey: "allergenSeverityLow", Color: "success" },
  { Id: 2, Name: "Medium", StringKey: "allergenSeverityMedium", Color: "warning" },
  { Id: 3, Name: "High", StringKey: "allergenSeverityHigh", Color: "danger" },
];

export const DIETARY_TYPES = [
  { Id: 1, Name: "Diabetic diet" },
  { Id: 2, Name: "Gluten-free diet" },
  { Id: 3, Name: "Pureed food" },
  { Id: 4, Name: "Lactose-free" },
];

// db DocumentType (5 items)
export const DOCUMENT_TYPES = [
  { Id: 1, Name: "Medical document" },
  { Id: 2, Name: "Personal document" },
  { Id: 3, Name: "Invoice" },
  { Id: 4, Name: "Offer" },
  { Id: 5, Name: "Other" },
];

export const ROLES = [
  { Id: 1, Name: "Administrator" },
  { Id: 2, Name: "Moderator" },
  { Id: 3, Name: "User" },
  { Id: 4, Name: "Nurse" },
  { Id: 5, Name: "Caregiver" },
  { Id: 8, Name: "Doctor" },
];

// db VacationStatus (Name, Color, Icon)
export const VACATION_STATUSES = [
  { Id: 1, Name: "Created", Color: "info", Icon: "checkmark-circle-2-outline" },
  { Id: 2, Name: "In progress", Color: "warning", Icon: "loader-outline" },
  { Id: 3, Name: "Cancelled", Color: "danger", Icon: "close-circle-outline" },
  { Id: 4, Name: "Completed", Color: "success", Icon: "checkmark-circle-outline" },
];

// db FurnitureStatus: Active/Inactive/Broken
export const FURNITURE_STATUSES = [
  { Id: 1, Name: "Active", Color: "success", Icon: "checkmark-circle-2-outline" },
  { Id: 2, Name: "Inactive", Color: "danger", Icon: "close-circle-outline" },
  { Id: 3, Name: "Broken", Color: "warning", Icon: "alert-triangle-outline" },
];

export const QUALIFICATIONS = [
  { Id: 1, Name: "Secondary education", Level: "IV." },
  { Id: 2, Name: "Bachelor's degree", Level: "VI." },
  { Id: 3, Name: "Master's degree", Level: "VII." },
];

// =====================================================================================
// RESIDENTS (persons)
// =====================================================================================
function person(
  Id: number, FirstName: string, LastName: string, GenderId: number,
  birth: string, start: string, roomId: number, cond: number, doctor: string
) {
  const room = ROOMS.find((r) => r.Id === roomId);
  return {
    Id, FirstName, LastName,
    JMBG: String(1000000000000 + Id * 7654321),
    BirthDate: birth,
    StartDate: start,
    EndDate: undefined,
    Active: true,
    CreationDate: start,
    RoomId: roomId,
    RoomName: room ? room.Name : "",
    FloorId: room ? room.FloorId : null,
    FloorName: room ? room.FloorName : "",
    GenderId,
    GenderName: GENDERS.find((g) => g.Id === GenderId)?.Name,
    GenderTag: GENDERS.find((g) => g.Id === GenderId)?.Tag,
    HealthConditionId: cond,
    HealthConditionName: HEALTH_CONDITIONS.find((h) => h.Id === cond)?.Name,
    Address: "Ilica 11",
    MaidenLastName: GenderId === 2 ? "Marković" : undefined,
    FatherFirstName: "Ivan",
    MotherFirstName: "Ana",
    ResidanceCityId: 1,
    ResidanceStreetName: "Ilica",
    ResidanceHouseNumber: String(10 + Id),
    BirthCityId: 1,
    BirthCountryId: 1,
    Telephone: "01 555 0" + (100 + Id),
    Mobile: "091 555 0" + (100 + Id),
    Email: "",
    DoctorName: doctor,
  };
}

export const PERSONS = [
  person(1, "Marija", "Horvat", 2, "1938-05-12", "2022-03-15", 1, 2, "dr. Ana Kovač"),
  person(2, "Ivan", "Kovačević", 1, "1941-11-03", "2021-06-01", 3, 1, "dr. Ana Kovač"),
  person(3, "Ana", "Babić", 2, "1935-02-28", "2020-09-10", 4, 3, "dr. Marko Jurić"),
  person(4, "Josip", "Marić", 1, "1944-07-19", "2023-01-20", 3, 2, "dr. Ana Kovač"),
  person(5, "Kata", "Novak", 2, "1932-09-08", "2019-11-05", 1, 3, "dr. Marko Jurić"),
  person(6, "Stjepan", "Vuković", 1, "1939-01-22", "2022-08-14", 3, 1, "dr. Ana Kovač"),
  person(7, "Ljubica", "Jurić", 2, "1936-12-14", "2021-02-28", 4, 2, "dr. Marko Jurić"),
  person(8, "Franjo", "Pavlović", 1, "1943-04-30", "2023-05-11", 5, 3, "dr. Ana Kovač"),
  person(9, "Dragica", "Tomić", 2, "1940-06-17", "2022-10-02", null, 1, "dr. Marko Jurić"),
  person(10, "Nikola", "Božić", 1, "1937-08-25", "2020-04-18", 6, 2, "dr. Ana Kovač"),
];

// ------- per-resident medical data (generators so EVERY profile is populated) -------
const MED_CATALOG = [
  { name: "Metformin", dose: "500 mg", freq: "2× daily", ind: "Type 2 diabetes", presc: "dr. Ana Kovač" },
  { name: "Ramipril", dose: "5 mg", freq: "1× morning", ind: "Hypertension", presc: "dr. Ana Kovač" },
  { name: "Aspirin", dose: "100 mg", freq: "1× morning", ind: "Prevention", presc: "dr. Marko Jurić" },
  { name: "Atorvastatin", dose: "20 mg", freq: "1× evening", ind: "High cholesterol", presc: "dr. Marko Jurić" },
  { name: "Pantoprazole", dose: "40 mg", freq: "1× morning", ind: "Stomach protection", presc: "dr. Ana Kovač" },
  { name: "Furosemide", dose: "40 mg", freq: "1× morning", ind: "Edema", presc: "dr. Ana Kovač" },
];

export function medicationsFor(personId: number) {
  const count = (personId % 3) + 1; // 1..3 meds each
  const out = [];
  for (let i = 0; i < count; i++) {
    const c = MED_CATALOG[(personId + i) % MED_CATALOG.length];
    out.push({
      Id: personId * 10 + i, PersonId: personId,
      MedicationName: c.name, Dosage: c.dose, Frequency: c.freq, Route: "Oral",
      Indication: c.ind, Notes: "", Status: "Active", PrescriberName: c.presc,
      MorningDose: i === 0 ? "1" : "0", NoonDose: "0", EveningDose: i % 2 === 0 ? "0" : "1", NightDose: "0",
      StartDate: "2023-01-15", IsActive: true,
    });
  }
  return out;
}

const ALLERGEN_CATALOG = [
  { name: "Penicillin", sev: 3, reaction: "Rash, swelling" },
  { name: "Lactose", sev: 2, reaction: "Digestive issues" },
  { name: "Pollen", sev: 1, reaction: "Sneezing, watery eyes" },
  { name: "Nuts", sev: 3, reaction: "Anaphylaxis (risk)" },
];

export function allergensFor(personId: number) {
  if (personId % 2 === 1) return []; // some residents have none
  const c = ALLERGEN_CATALOG[personId % ALLERGEN_CATALOG.length];
  const sev = ALLERGEN_SEVERITIES.find((s) => s.Id === c.sev);
  return [{
    Id: personId * 20, PersonId: personId, AllergenName: c.name, ReactionDescription: c.reaction,
    SeverityId: c.sev, SeverityName: sev?.Name, SeverityStringKey: sev?.StringKey, SeverityColor: sev?.Color,
    StartDate: "2022-05-01", IsActive: true,
  }];
}

export function functionalStatusFor(personId: number) {
  const p = PERSONS.find((x) => x.Id === personId);
  const nonMobile = p?.HealthConditionId === 3;
  return [{
    Id: personId * 30, PersonId: personId,
    MobilityStatus: nonMobile ? "Immobile" : "Independently mobile",
    CognitiveStatus: "Preserved functions",
    FallRisk: nonMobile ? "High" : "Low",
    VisualStatus: "Wears glasses", HearingStatus: "Normal",
    MobilityHighRisk: nonMobile, CognitiveHighRisk: false, FallHighRisk: nonMobile,
    VisualHighRisk: false, HearingHighRisk: false,
    AssessmentDate: "2025-06-01", NotesDescription: "Regular status assessment.",
  }];
}

export function dietaryFor(personId: number) {
  if (personId % 3 === 2) return [];
  const t = DIETARY_TYPES[personId % DIETARY_TYPES.length];
  return [{
    Id: personId * 40, PersonId: personId, DietaryTypeId: t.Id, DietaryTypeName: t.Name,
    Restrictions: "No sugar, reduced salt intake", Notes: "Monitored by a nutritionist.",
    StartDate: "2023-03-01", IsActive: true,
  }];
}

export function insuranceFor(personId: number) {
  return [{
    Id: personId * 50, PersonId: personId,
    InsuranceCompany: "National Health Fund", PolicyNumber: "HR-" + (100000 + personId * 137),
    GroupNumber: "G-" + (personId % 5), CoverageStartDate: "2020-01-01", CoverageEndDate: "2027-12-31",
    CoverageType: "Basic health insurance", Status: "Active",
  }];
}

export function contactsFor(personId: number) {
  const p = PERSONS.find((x) => x.Id === personId);
  const ln = p ? p.LastName : "Horvat";
  return [
    { Id: personId * 60 + 1, PersonId: personId, FirstName: "Petar", LastName: ln, Jmbg: String(2000000000000 + personId * 111),
      Email: "petar." + ln.toLowerCase() + "@example.com", Telephone: "01 600 0" + personId, Mobile: "091 600 0" + personId,
      ResidanceCityId: 1, ResidanceStreetName: "Vlaška", ResidanceHouseNumber: "22", IsObligeeToPay: true, IsGuardian: true },
    { Id: personId * 60 + 2, PersonId: personId, FirstName: "Marta", LastName: ln, Jmbg: String(2100000000000 + personId * 111),
      Email: "marta." + ln.toLowerCase() + "@example.com", Telephone: "", Mobile: "098 600 0" + personId,
      ResidanceCityId: 2, ResidanceStreetName: "Savska", ResidanceHouseNumber: "8", IsObligeeToPay: false, IsGuardian: false },
  ];
}

const NOTE_TEXTS = [
  { t: "Routine check-up", x: "Resident responds well to therapy. No complaints." },
  { t: "Family visit", x: "Daughter visited and brought personal belongings." },
  { t: "Physiotherapy", x: "Progress in mobility exercises." },
  { t: "Nutrition", x: "Menu adjusted per the nutritionist's recommendation." },
];

export function notesFor(personId: number) {
  const count = (personId % 3) + 1;
  const out = [];
  for (let i = 0; i < count; i++) {
    const n = NOTE_TEXTS[(personId + i) % NOTE_TEXTS.length];
    out.push({
      Id: personId * 70 + i, PersonId: personId, Title: n.t, Text: n.x,
      CreationDate: "2025-0" + ((i % 8) + 1) + "-12", IsFavorite: i === 0, Tags: i === 0 ? [TAGS[3]] : [],
    });
  }
  return out;
}

// documents per person — each references a real (fictional) PDF for preview
export function documentsFor(personId: number) {
  const base = personId * 80;
  return [
    { Id: base + 1, PersonId: personId, Name: "Medical report", DocumentTypeId: 1, Extension: "pdf", FileType: "application/pdf", CreationDate: "2024-11-02" },
    { Id: base + 2, PersonId: personId, Name: "ID card", DocumentTypeId: 2, Extension: "pdf", FileType: "application/pdf", CreationDate: "2022-03-15" },
    { Id: base + 3, PersonId: personId, Name: "Accommodation contract", DocumentTypeId: 3, Extension: "pdf", FileType: "application/pdf", CreationDate: "2022-03-15" },
  ];
}

// returns { document, content } where content is raw base64 (previewFile decodes with atob)
export function documentContent(documentId: number) {
  const kind = documentId % 3; // matches documentsFor ids (base+1 medical, +2 personal, +3 contract)
  const pdf = kind === 1 ? DEMO_PDFS.medical : kind === 2 ? DEMO_PDFS.personal : DEMO_PDFS.contract;
  const name = kind === 1 ? "Medical report" : kind === 2 ? "ID card" : "Accommodation contract";
  return { document: { Id: documentId, Name: name, Extension: "pdf", FileType: "application/pdf" }, content: pdf };
}

// =====================================================================================
// EMPLOYEES + vacations
// =====================================================================================
function emp(Id: number, FirstName: string, LastName: string, jmbg: string, birth: string, empDate: string, jobId: number, empTypeId: number, active: boolean) {
  return {
    Id, FirstName, LastName, JMBG: jmbg, BirthDate: birth, EmploymentDate: empDate,
    JobPositionId: jobId, JobPositionName: JOB_POSITIONS.find((j) => j.Id === jobId)?.Name,
    EmploymentTypeId: empTypeId, EmploymentTypeName: EMPLOYMENT_TYPES.find((e) => e.Id === empTypeId)?.Name,
    Email: FirstName.toLowerCase() + "." + LastName.toLowerCase().replace(/[^a-z]/g, "") + "@demo.local",
    Mobile: "091 200 00" + Id, Active: active,
  };
}

export const EMPLOYEES = [
  emp(1, "Petra", "Šimić", "3001987400011", "1987-01-30", "2019-04-01", 2, 2, true),
  emp(2, "Tomislav", "Barić", "1505199000012", "1990-05-15", "2020-09-15", 3, 2, true),
  emp(3, "Marko", "Jurić", "2208197800013", "1978-08-22", "2018-01-10", 5, 1, true),
  emp(4, "Ivana", "Perić", "1103199200014", "1992-03-11", "2021-06-01", 3, 2, true),
  emp(5, "Ana", "Kovač", "0712198000015", "1980-12-07", "2017-03-20", 5, 1, true),
  emp(6, "Josipa", "Lovrić", "1809199500016", "1995-09-18", "2022-11-02", 1, 2, true),
  emp(7, "Damir", "Knežević", "0403198300017", "1983-04-03", "2016-05-05", 4, 2, false),
];

export function vacationsFor(employeeId: number) {
  const yr = now().getFullYear();
  return [
    { Id: employeeId * 100 + 1, EmployeeId: employeeId, Year: yr, FromDate: yr + "-07-01", ToDate: yr + "-07-14", DaysTaken: 10, DaysTotal: 25, StatusId: 4 },
    { Id: employeeId * 100 + 2, EmployeeId: employeeId, Year: yr, FromDate: yr + "-12-27", ToDate: yr + "-12-31", DaysTaken: 3, DaysTotal: 25, StatusId: 2 },
    { Id: employeeId * 100 + 3, EmployeeId: employeeId, Year: yr - 1, FromDate: (yr - 1) + "-08-05", ToDate: (yr - 1) + "-08-20", DaysTaken: 12, DaysTotal: 25, StatusId: 4 },
  ];
}

// =====================================================================================
// SERVICES / PACKAGES / DISCOUNTS
// =====================================================================================
export const SERVICES = [
  { Id: 1, Name: "Basic care", Description: "Daily resident care", CostPerUnit: 350, DefaultNumberOfUnits: 1, MeasureUnitId: 1, MeasureUnitName: "Day", MeasureUnitTag: "day", PriceUnitId: 2, PriceUnitName: "Daily", PriceUnitTag: "day", Quantity: 1, Price: 350 },
  { Id: 2, Name: "Accommodation", Description: "Room accommodation", CostPerUnit: 300, DefaultNumberOfUnits: 1, MeasureUnitId: 1, MeasureUnitName: "Day", MeasureUnitTag: "day", PriceUnitId: 2, PriceUnitName: "Daily", PriceUnitTag: "day", Quantity: 1, Price: 300 },
  { Id: 3, Name: "Physiotherapy", Description: "Individual therapy", CostPerUnit: 120, DefaultNumberOfUnits: 4, MeasureUnitId: 4, MeasureUnitName: "Piece", MeasureUnitTag: "pcs", PriceUnitId: 3, PriceUnitName: "Per piece", PriceUnitTag: "pcs", Quantity: 4, Price: 480 },
  { Id: 4, Name: "Medical services", Description: "Physician supervision", CostPerUnit: 200, DefaultNumberOfUnits: 1, MeasureUnitId: 4, MeasureUnitName: "Piece", MeasureUnitTag: "pcs", PriceUnitId: 1, PriceUnitName: "Monthly", PriceUnitTag: "mo", Quantity: 1, Price: 200 },
  { Id: 5, Name: "Meals", Description: "Three meals per day", CostPerUnit: 150, DefaultNumberOfUnits: 1, MeasureUnitId: 1, MeasureUnitName: "Day", MeasureUnitTag: "day", PriceUnitId: 2, PriceUnitName: "Daily", PriceUnitTag: "day", Quantity: 1, Price: 150 },
];

export const PACKAGES = [
  { Id: 1, Name: "Basic care package", Description: "Accommodation + basic care + meals", DefaultPackagePrice: 650, DefaultPackagePriceUnitId: 1, CalculationMeasureUnitId: "1", PackagePriceCalculated: true, PriceUnitName: "Monthly", PriceUnitTag: "mo", MeasureUnitTag: "mo", Price: 650, PriceRounded: "650.00" },
  { Id: 2, Name: "Extended care package", Description: "Basic + physiotherapy + medical supervision", DefaultPackagePrice: 850, DefaultPackagePriceUnitId: 1, CalculationMeasureUnitId: "1", PackagePriceCalculated: true, PriceUnitName: "Monthly", PriceUnitTag: "mo", MeasureUnitTag: "mo", Price: 850, PriceRounded: "850.00" },
  { Id: 3, Name: "Premium care package", Description: "Single room + full care", DefaultPackagePrice: 1100, DefaultPackagePriceUnitId: 1, CalculationMeasureUnitId: "1", PackagePriceCalculated: true, PriceUnitName: "Monthly", PriceUnitTag: "mo", MeasureUnitTag: "mo", Price: 1100, PriceRounded: "1,100.00" },
];

export function servicesForPackage(packageId: number) {
  const map: Record<number, number[]> = { 1: [1, 2, 5], 2: [1, 2, 5, 3, 4], 3: [1, 2, 5, 3, 4] };
  const ids = map[packageId] || [1, 2];
  return SERVICES.filter((s) => ids.includes(s.Id)).map((s) => ({
    ServiceName: s.Name, Name: s.Name, Quantity: s.Quantity, CostPerUnit: s.CostPerUnit,
    MeasureUnitId: s.MeasureUnitId, MeasureUnitTag: s.MeasureUnitTag, DefaultNumberOfUnits: s.DefaultNumberOfUnits,
  }));
}

export const DISCOUNTS = [
  { Id: 1, Name: "Long-term stay", Description: "Discount for stays longer than one year", Quantity: 1, PercentCalculation: 10 },
  { Id: 2, Name: "Family discount", Description: "For two or more family members", Quantity: 1, PercentCalculation: 5 },
  { Id: 3, Name: "Veterans", Description: "Discount for veterans' families", Quantity: 1, PercentCalculation: 15 },
];

// =====================================================================================
// USERS
// =====================================================================================
export const USERS = [
  { Id: "u1", FirstName: "Demo", LastName: "Administrator", Username: "admin", Email: "admin@demo.local", RoleId: 1, Active: true, Blocked: false, Verified: true },
  { Id: "u2", FirstName: "Petra", LastName: "Šimić", Username: "psimic", Email: "petra.simic@demo.local", RoleId: 4, Active: true, Blocked: false, Verified: true },
  { Id: "u3", FirstName: "Marko", LastName: "Jurić", Username: "mjuric", Email: "marko.juric@demo.local", RoleId: 8, Active: true, Blocked: false, Verified: true },
  { Id: "u4", FirstName: "Tomislav", LastName: "Barić", Username: "tbaric", Email: "tomislav.baric@demo.local", RoleId: 5, Active: true, Blocked: false, Verified: false },
  { Id: "u5", FirstName: "Ivana", LastName: "Perić", Username: "iperic", Email: "ivana.peric@demo.local", RoleId: 3, Active: false, Blocked: true, Verified: true },
];

// =====================================================================================
// FURNITURE
// =====================================================================================
export const FURNITURE = [
  { Id: 1, Name: "Hospital bed", InventoryCode: "INV-0001", RoomId: 1, FloorId: 1, LatestStatusId: 1, LatestStatusDate: "2025-01-10", CreationDate: "2021-01-05", Description: "Electric adjustable bed" },
  { Id: 2, Name: "Wardrobe", InventoryCode: "INV-0002", RoomId: 1, FloorId: 1, LatestStatusId: 1, LatestStatusDate: "2025-01-10", CreationDate: "2021-01-05", Description: "Three-door wardrobe" },
  { Id: 3, Name: "Wheelchair", InventoryCode: "INV-0003", RoomId: 3, FloorId: 2, LatestStatusId: 3, LatestStatusDate: "2025-08-01", CreationDate: "2020-06-11", Description: "Brake repair needed" },
  { Id: 4, Name: "Armchair", InventoryCode: "INV-0004", RoomId: 4, FloorId: 2, LatestStatusId: 1, LatestStatusDate: "2025-03-22", CreationDate: "2022-02-18", Description: "" },
  { Id: 5, Name: "Nightstand", InventoryCode: "INV-0005", RoomId: 5, FloorId: 3, LatestStatusId: 2, LatestStatusDate: "2025-09-05", CreationDate: "2019-09-30", Description: "Damaged drawer" },
];

// =====================================================================================
// DOCTOR VISITS
// =====================================================================================
export const DOCTOR_VISITS = [
  { DoctorVisitId: 1, Id: 1, Date: isoOn(4, 9), Doctors: "dr. Ana Kovač", Nurses: "Petra Šimić", Persons: "Marija Horvat, Ivan Kovačević" },
  { DoctorVisitId: 2, Id: 2, Date: isoOn(11, 10), Doctors: "dr. Marko Jurić", Nurses: "Petra Šimić", Persons: "Ana Babić, Kata Novak, Stjepan Vuković" },
  { DoctorVisitId: 3, Id: 3, Date: isoOn(18, 9), Doctors: "dr. Ana Kovač", Nurses: "Tomislav Barić", Persons: "Josip Marić" },
];

// =====================================================================================
// CALENDAR EVENTS (EventTypeId: 1 birthday, 2 vacation, 3 other)
// =====================================================================================
export const EVENTS = [
  { Id: 1, Title: "Medical check-up — dr. Kovač", Description: "Regular monthly check-up", Start: isoOn(3, 9), End: isoOn(3, 11), Color: "#3366ff", EventTypeId: 3, Recurring: false, Reminder: true },
  { Id: 2, Title: "Physiotherapy", Description: "Group mobility exercise", Start: isoOn(5, 10), End: isoOn(5, 11), Color: "#00d68f", EventTypeId: 3, Recurring: true, Reminder: false },
  { Id: 3, Title: "Family visit — room 1-01", Description: "", Start: isoOn(8, 15), End: isoOn(8, 17), Color: "#ffaa00", EventTypeId: 3, Recurring: false, Reminder: false },
  { Id: 4, Title: "Medication delivery", Description: "Monthly order", Start: isoOn(12, 8), End: isoOn(12, 9), Color: "#a16eff", EventTypeId: 3, Recurring: false, Reminder: true },
  { Id: 5, Title: "Birthday — Kata Novak", Description: "90th birthday", Start: isoOn(20, 16), End: isoOn(20, 18), Color: "#ff3d71", EventTypeId: 1, Recurring: false, Reminder: true },
  { Id: 6, Title: "Doctor's round", Description: "Resident rounds", Start: isoOn(25, 9), End: isoOn(25, 12), Color: "#3366ff", EventTypeId: 3, Recurring: false, Reminder: true },
];

// =====================================================================================
// CALCULATIONS (invoices) — StatusId: 1 Paid, 2 Not paid, 3 Cancelled
// =====================================================================================
export const CALCULATIONS = PERSONS.map((p, i) => {
  const statusId = [1, 2, 2, 1, 2, 3, 2, 1, 2, 1][i];
  const sys = [650, 900, 500, 650, 850, 500, 900, 650, 700, 850][i];
  const paid = statusId === 1;
  const mm = String(currentMonth()).padStart(2, "0");
  return {
    Id: 100 + p.Id, PersonId: p.Id,
    PersonFirstName: p.FirstName, PersonLastName: p.LastName, PersonJMBG: p.JMBG,
    PersonName: p.FirstName + " " + p.LastName, RoomName: p.RoomName,
    Month: currentMonth(), Year: currentYear(),
    Range: "01." + mm + ". - 30." + mm + ".", CalculationDate: currentYear() + "-" + mm + "-01",
    SystemPrice: sys, RealPrice: sys, PaidPrice: paid ? sys : 0,
    DatePaid: paid ? currentYear() + "-" + mm + "-05" : null,
    TotalAmount: sys, RealAmount: sys, Paid: paid,
    StatusId: statusId, StatusName: CALCULATION_STATUSES.find((s) => s.Id === statusId)?.Name,
  };
});

export function calculationsForPerson(personId: number) {
  const out = [];
  for (let mo = 0; mo < 4; mo++) {
    const d = new Date(now().getFullYear(), now().getMonth() - mo, 1);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const statusId = mo === 0 ? 2 : 1;
    out.push({
      Id: 500 + personId * 10 + mo, PersonId: personId, Month: d.getMonth() + 1, Year: d.getFullYear(),
      Range: "01." + mm + ". - 30." + mm + ".", CalculationDate: d.getFullYear() + "-" + mm + "-01",
      StatusId: statusId, SystemPrice: 650, RealPrice: 650, PaidPrice: statusId === 1 ? 650 : 0,
      DatePaid: statusId === 1 ? d.getFullYear() + "-" + mm + "-05" : null,
      StatusName: CALCULATION_STATUSES.find((s) => s.Id === statusId)?.Name,
    });
  }
  return out;
}

// =====================================================================================
// ACCOMMODATION BOARD — { Persons, Floors, Rooms } (accomodation-management page)
// =====================================================================================
export function accommodationBoard() {
  return {
    Persons: PERSONS.map((p) => ({
      Id: p.Id, PersonId: p.Id, FirstName: p.FirstName, LastName: p.LastName,
      RoomId: p.RoomId, GenderId: p.GenderId, GenderName: p.GenderName,
    })),
    Floors: FLOORS.map((f) => ({ Id: f.Id, Name: f.Name })),
    Rooms: ROOMS.map((r) => ({
      Id: r.Id, Name: r.Name, FloorId: r.FloorId, Capacity: r.Capacity, RoomGenderId: r.RoomGenderId,
    })),
  };
}

// =====================================================================================
// DASHBOARD SUMMARY — every property is an array (admin-dashboard reads data.X[0]/.length)
// =====================================================================================
export function dashboardSummary() {
  const capacity = ROOMS.reduce((s, r) => s + r.Capacity, 0);
  const males = PERSONS.filter((p) => p.GenderId === 1).length;
  const females = PERSONS.filter((p) => p.GenderId === 2).length;

  const activePersons: any[] = [];
  const base = now();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
    const ym = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
    activePersons.push({ YearMonth: ym, ActivePersonsCount: PERSONS.length - i });
  }

  const byJob: Record<string, number> = {};
  EMPLOYEES.forEach((e) => { byJob[e.JobPositionName] = (byJob[e.JobPositionName] || 0) + 1; });
  const employeesByJobPosition = Object.keys(byJob).map((k) => ({ JobPositionName: k, NumberOfEmployees: byJob[k] }));

  const oldest = [...PERSONS].sort((a, b) => new Date(a.BirthDate).getTime() - new Date(b.BirthDate).getTime())[0];
  const longest = [...PERSONS].sort((a, b) => new Date(a.StartDate).getTime() - new Date(b.StartDate).getTime())[0];

  return {
    Summary: [{ TakenSpace: PERSONS.length, Capacity: capacity, MalePersons: males, FemalePersons: females }],
    LongestPerson: [{ FirstName: longest.FirstName, LastName: longest.LastName, StartDate: longest.StartDate }],
    OldestPerson: [{ FirstName: oldest.FirstName, LastName: oldest.LastName, BirthDate: oldest.BirthDate }],
    ActivePersons: activePersons,
    EmployeesByGender: [{ FemaleEmployees: 4, MaleEmployees: 3 }],
    AllTimeEmployees: [{ Count: EMPLOYEES.length }],
    Employees: EMPLOYEES,
    PersonWithLongestLastVisit: [{ FirstName: PERSONS[2].FirstName, LastName: PERSONS[2].LastName }],
    EmployeesByJobPosition: employeesByJobPosition,
    Events: EVENTS,
  };
}

export function userDashboardSummary() {
  return [{ UnpaidCalculations: CALCULATIONS.filter((c) => !c.Paid).length, Persons: PERSONS.length }];
}

export function calculationSummary() {
  const totalSys = CALCULATIONS.reduce((s, c) => s + c.SystemPrice, 0);
  const totalPaid = CALCULATIONS.reduce((s, c) => s + c.PaidPrice, 0);
  return { Summary: { SystemPrice: totalSys, RealPrice: totalSys, PaidPrice: totalPaid, Count: CALCULATIONS.length } };
}

// =====================================================================================
// AUTH
// =====================================================================================
export function demoLoginResponse(identifier: string) {
  // ADMIN only (RoleId 1): single (admin) dashboard renders and ADMIN unlocks every route.
  return {
    Authenticated: true,
    Token: "demo-jwt-token." + btoa(identifier || "demo") + ".signature",
    User: { Id: "demo-user-1", FirstName: "Demo", LastName: "User", Username: identifier || "demo", Email: "demo@demo.local", DateRegistered: "2022-01-01" },
    Roles: [{ RoleId: 1 }],
    Permissions: [{ Code: "*", Name: "All permissions" }],
    Persons: [],
  };
}

// =====================================================================================
// ROUTER
// =====================================================================================
export function getMock(
  method: string, path: string, query: Record<string, string>, body: any
): { matched: boolean; body: any } {
  const m = method.toUpperCase();
  const hit = (b: any) => ({ matched: true, body: b });
  const pid = () => Number(query["PersonId"] || query["personId"] || query["id"]);

  if (path.includes("authentication/login")) return hit(demoLoginResponse(body?.Identifier));
  if (path.includes("authentication/")) return hit({ success: true });

  switch (true) {
    // ---- medical profile (per person) ----
    case path.startsWith("person-medications"): return hit(medicationsFor(pid()));
    case path.includes("person-allergens/severities"): return hit(ALLERGEN_SEVERITIES);
    case path.startsWith("person-allergens"): return hit(allergensFor(pid()));
    case path.startsWith("person-functional-status"): return hit(functionalStatusFor(pid()));
    case path.includes("person-dietary-restrictions/types"): return hit(DIETARY_TYPES);
    case path.startsWith("person-dietary-restrictions"): return hit(dietaryFor(pid()));
    case path.startsWith("person-insurance"): return hit(insuranceFor(pid()));

    // ---- dashboard ----
    case path.includes("summary/getDashboardSummary"): return hit(dashboardSummary());
    case path.includes("summary/getUserDashboardSummary"): return hit(userDashboardSummary());

    // ---- persons ----
    case path.includes("persons/getPersonsForUserDashboard"):
    case path.includes("persons/getPersonsForUser"): return hit(PERSONS.slice(0, 5));
    case path.includes("persons/personDetailed"):
    case path.includes("persons/personDetails"):
      return hit([PERSONS.find((p) => p.Id === Number(query["id"])) || PERSONS[0]]);
    case path.includes("persons/searchPersons"): {
      const term = (query["searchTerm"] || "").toLowerCase();
      return hit(PERSONS.filter((p) => (p.FirstName + " " + p.LastName).toLowerCase().includes(term)));
    }
    case path.includes("persons/getLogForPerson"):
      return hit([
        { Id: 1, LogType: 1, LogTypePretty: "Created", CreationDate: "2022-03-15", FirstName: "Demo", LastName: "User" },
        { Id: 2, LogType: 2, LogTypePretty: "Data changed", CreationDate: "2024-05-10", FirstName: "Demo", LastName: "User" },
      ]);
    case path.includes("persons/roomsHistoryForPerson"):
      return hit([{ Id: 1, RoomName: "P-01", FloorName: "Ground floor", StartDate: "2022-03-15", EndDate: null }]);
    case path.includes("persons/getActivePersonsByMonthYear"): return hit(PERSONS);
    case path === "persons" || path.startsWith("persons?") || path.startsWith("persons/"): return hit(PERSONS);

    // ---- calculations ----
    case path.includes("calculation/getCalculationStatuses"): return hit(CALCULATION_STATUSES);
    case path.includes("calculation/calculationSummary"): return hit(calculationSummary());
    case path.includes("calculation/getCalculationsSummaryForPerson"): return hit(calculationSummary());
    case path.includes("calculation/getCalculationsForPerson"): return hit(calculationsForPerson(pid()));
    case path.includes("calculation/calculationDocuments"): return hit([]);
    case path.startsWith("calculation"): return hit(CALCULATIONS);

    // ---- calendar ----
    case path.includes("events/getUserDashboardEvents"):
    case path === "events" || path.startsWith("events?"): return hit(EVENTS);

    // ---- documents ----
    case path.includes("documents/getDocumentTypesForPerson"): return hit(DOCUMENT_TYPES);
    case path.includes("documents/getDocumentTypes"): return hit(DOCUMENT_TYPES);
    case path.includes("documents/getDocumentContent"):
      return hit(documentContent(Number(query["DocumentId"] || query["id"])));
    case path.includes("documents/getDocumentsForPersonByType"): {
      const typeId = Number(query["DocumentTypeId"]);
      return hit(documentsFor(pid()).filter((d) => !typeId || d.DocumentTypeId === typeId));
    }
    case path.startsWith("documents"): return hit(documentsFor(pid()));

    // ---- notes / contacts (per person) ----
    case path.includes("notes/getNoteTags"): return hit([TAGS[0], TAGS[3]]);
    case path.includes("notes/getNoteDocuments"): return hit([]);
    case path.includes("notes/getNoteDetails"): return hit(notesFor(pid()).slice(0, 1));
    case path.startsWith("notes"): return hit(notesFor(pid()));
    case path.startsWith("contacts"): return hit(contactsFor(pid()));

    // ---- doctor visits ----
    case path.includes("doctor-visits/getDoctorsAndNurses"):
      return hit([{ Id: 1, Name: "dr. Ana Kovač", Type: "Doctor" }, { Id: 2, Name: "Petra Šimić", Type: "Nurse" }]);
    case path.includes("doctor-visits/getPersons"): return hit(PERSONS.slice(0, 3));
    case path.includes("doctor-visits/getSummary"): return hit([{ Total: 3, Completed: 1 }]);
    case path.includes("doctor-visits/getVisitTourDetails"): return hit([DOCTOR_VISITS[0]]);
    case path.startsWith("doctor-visits"): return hit(DOCTOR_VISITS);

    // ---- employees / vacations ----
    case path.includes("employees/employeeDetails"):
    case path.includes("employees/EmployeeDetailed"):
      return hit([EMPLOYEES.find((e) => e.Id === Number(query["id"])) || EMPLOYEES[0]]);
    case path.includes("employees/getUserEmployeeId"): return hit([{ EmployeeId: 1 }]);
    case path.startsWith("employees"): return hit(EMPLOYEES);
    case path.includes("vacations/getRemainingVacationDays"): return hit([{ Remaining: 12, Total: 25 }]);
    case path.includes("vacations/getVacationsForPerson"):
    case path.startsWith("vacations"): return hit(vacationsFor(Number(query["id"]) || 1));

    // ---- services / packages / discounts ----
    case path.includes("services/getServicesForPackage"):
      return hit(servicesForPackage(Number(query["id"] || query["PackageId"] || query["packageId"])));
    case path.startsWith("services-management"): return hit(SERVICES);
    case path.startsWith("services"): return hit(SERVICES);
    case path.startsWith("packages"): return hit(PACKAGES);
    case path.startsWith("discounts"): return hit(DISCOUNTS);

    // ---- users ----
    case path.includes("users/getRoles"): return hit(ROLES);
    case path.includes("users/roles"): return hit([{ RoleId: 1, Name: "Administrator" }]);
    case path.includes("users/getUserData"): return hit([USERS[0]]);
    case path.startsWith("users"): return hit(USERS);

    // ---- furniture ----
    case path.startsWith("furniture-statuses"): return hit(FURNITURE_STATUSES);
    case path.startsWith("furniture"): return hit(FURNITURE);

    // ---- rooms (accommodation board must come before generic rooms) ----
    case path.includes("rooms/getAccomodationManagementRooms"): return hit(accommodationBoard());
    case path.includes("rooms/getAvaliableRooms"):
    case path.includes("rooms/getRoomsForFloor"):
    case path.startsWith("rooms"): return hit(ROOMS);

    // ---- simple lookups ----
    case path.startsWith("genders"): return hit(GENDERS);
    case path.startsWith("countries"): return hit(COUNTRIES);
    case path.startsWith("cities"): return hit(CITIES);
    case path.startsWith("municipalities"): return hit(MUNICIPALITIES);
    case path.startsWith("floors"): return hit(FLOORS);
    case path.startsWith("accommodation-types"): return hit(ACCOMMODATION_TYPES);
    case path.startsWith("accommodation-pdf-request"): return hit({ success: true });
    case path.startsWith("health-conditions"): return hit(HEALTH_CONDITIONS);
    case path.startsWith("person-categories"): return hit(PERSON_CATEGORIES);
    case path.startsWith("categories"): return hit(PERSON_CATEGORIES);
    case path.startsWith("tags"): return hit(TAGS);
    case path.startsWith("measure-units"): return hit(MEASURE_UNITS);
    case path.startsWith("price-units"): return hit(PRICE_UNITS);
    case path.startsWith("employment-types"): return hit(EMPLOYMENT_TYPES);
    case path.startsWith("job-positions"): return hit(JOB_POSITIONS);
    case path.startsWith("qualifications"): return hit(QUALIFICATIONS);
    case path.startsWith("notifications"): return hit([]);
    case path.startsWith("general-settings"): return hit({ Value: "1", KmPrice: 0.5, Currency: "EUR" });
    case path.startsWith("my-profile"):
      return hit([{ Id: "demo-user-1", FirstName: "Demo", LastName: "User", Email: "demo@demo.local", Username: "demo" }]);
  }

  if (m === "GET") return { matched: false, body: [] };
  return { matched: false, body: { ...(body || {}), Id: body?.Id || Date.now(), success: true } };
}

// =====================================================================================
// date helpers
// =====================================================================================
function now() { return new Date(); }
function currentMonth() { return now().getMonth() + 1; }
function currentYear() { return now().getFullYear(); }
function isoOn(day: number, hour: number) {
  return new Date(now().getFullYear(), now().getMonth(), day, hour, 0, 0).toISOString();
}
