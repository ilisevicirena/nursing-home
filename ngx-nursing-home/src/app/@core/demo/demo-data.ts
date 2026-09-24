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
  { Id: 1, Name: "P-01", FloorId: 1, FloorName: "Ground floor", Capacity: 2, RoomGenderId: 2, Width: 220, Height: 190, Top: 20, Left: 20 },
  { Id: 2, Name: "P-02", FloorId: 1, FloorName: "Ground floor", Capacity: 2, RoomGenderId: null, Width: 220, Height: 190, Top: 20, Left: 260 },
  { Id: 3, Name: "1-01", FloorId: 2, FloorName: "1st floor", Capacity: 3, RoomGenderId: 1, Width: 240, Height: 230, Top: 20, Left: 20 },
  { Id: 4, Name: "1-02", FloorId: 2, FloorName: "1st floor", Capacity: 2, RoomGenderId: 2, Width: 220, Height: 190, Top: 20, Left: 280 },
  { Id: 5, Name: "2-01", FloorId: 3, FloorName: "2nd floor", Capacity: 1, RoomGenderId: 1, Width: 200, Height: 150, Top: 20, Left: 20 },
  { Id: 6, Name: "2-02", FloorId: 3, FloorName: "2nd floor", Capacity: 2, RoomGenderId: null, Width: 220, Height: 190, Top: 20, Left: 240 },
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
  { RoleId: 1, RoleName: "Administrator", Description: "Full access to all modules, users and settings." },
  { RoleId: 2, RoleName: "Moderator", Description: "Manage content and residents; limited settings access." },
  { RoleId: 3, RoleName: "User", Description: "Basic access to assigned residents and daily tasks." },
  { RoleId: 4, RoleName: "Nurse", Description: "Clinical care, medications and assessments." },
  { RoleId: 5, RoleName: "Caregiver", Description: "Daily resident care and activity logging." },
  { RoleId: 8, RoleName: "Doctor", Description: "Medical examinations, diagnoses and visit records." },
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
  const p = PERSONS.find((x) => x.Id === personId);
  const out = [];
  for (let i = 0; i < count; i++) {
    const n = NOTE_TEXTS[(personId + i) % NOTE_TEXTS.length];
    const date = "2025-0" + ((i % 8) + 1) + "-12";
    out.push({
      Id: personId * 70 + i, PersonId: personId,
      PersonFirstName: p ? p.FirstName : "", PersonLastName: p ? p.LastName : "",
      Title: n.t, Text: n.x,
      CreationDate: date, LastModified: date,
      IsFavorite: i === 0, Tags: i === 0 ? [TAGS[3]] : [],
    });
  }
  return out;
}

// medical notes written by the doctor during a visit (doctor-visit details tab)
const MEDICAL_VISIT_NOTES = [
  { t: "Routine examination", x: "Blood pressure 130/85 mmHg, pulse regular. Patient stable, no acute complaints. Continue current therapy.", tags: [TAGS[0]] },
  { t: "Follow-up assessment", x: "Reviewed mobility and joint status. Recommended continued physiotherapy twice weekly. Vitals within normal range.", tags: [TAGS[3]] },
  { t: "Medication review", x: "Adjusted antihypertensive dosage. Blood glucose to be monitored daily for one week; reassess at next visit.", tags: [TAGS[0]] },
  { t: "Wound care", x: "Pressure area on the sacrum healing well. Dressing changed, no signs of infection. Reassess in 7 days.", tags: [TAGS[4]] },
];

export function visitNoteFor(personId: number) {
  const p = PERSONS.find((x) => x.Id === personId);
  const n = MEDICAL_VISIT_NOTES[personId % MEDICAL_VISIT_NOTES.length];
  return {
    Id: 900000 + personId, PersonId: personId,
    PersonFirstName: p ? p.FirstName : "", PersonLastName: p ? p.LastName : "",
    Title: n.t, Text: n.x, Tags: n.tags, Documents: [],
    CreationDate: isoOn(4, 9), LastModified: isoOn(4, 9),
  };
}

// documents per person — each references a real (fictional) PDF for preview
export function documentsFor(personId: number) {
  const base = personId * 80;
  const p = PERSONS.find((x) => x.Id === personId);
  const author = { PersonFirstName: p ? p.FirstName : "", PersonLastName: p ? p.LastName : "" };
  return [
    { Id: base + 1, PersonId: personId, ...author, Name: "Medical report", DocumentTypeId: 1, Extension: "pdf", FileType: "application/pdf", CreationDate: "2024-11-02" },
    { Id: base + 2, PersonId: personId, ...author, Name: "ID card", DocumentTypeId: 2, Extension: "pdf", FileType: "application/pdf", CreationDate: "2022-03-15" },
    { Id: base + 3, PersonId: personId, ...author, Name: "Accommodation contract", DocumentTypeId: 3, Extension: "pdf", FileType: "application/pdf", CreationDate: "2022-03-15" },
  ];
}

// returns { document, content } where content is raw base64 (previewFile decodes with atob)
export function documentContent(documentId: number) {
  const kind = documentId % 3; // matches documentsFor ids (base+1 medical, +2 personal, +3 contract)
  const pdf = kind === 1 ? DEMO_PDFS.medical : kind === 2 ? DEMO_PDFS.personal : DEMO_PDFS.contract;
  const name = kind === 1 ? "Medical report" : kind === 2 ? "ID card" : "Accommodation contract";
  return { document: { Id: documentId, Name: name, Extension: "pdf", FileType: "application/pdf" }, content: pdf };
}

// ---- Medication Administration Record (MAR): daily per-slot schedule + status ----
export function marScheduleFor(personId: number, dateStr?: string) {
  const meds = medicationsFor(personId);
  const todayStr = isoDate(now());
  const rel = !dateStr ? 0 : dateStr < todayStr ? -1 : dateStr > todayStr ? 1 : 0; // -1 past / 0 today / 1 future
  const slotDefs = [
    { key: "morning", time: "08:00", flag: "MorningDose" },
    { key: "noon", time: "12:00", flag: "NoonDose" },
    { key: "evening", time: "18:00", flag: "EveningDose" },
    { key: "night", time: "22:00", flag: "NightDose" },
  ];
  return meds.map((med, mi) => ({
    Id: med.Id,
    MedicationName: med.MedicationName,
    Dosage: med.Dosage,
    Route: med.Route,
    slots: slotDefs.map((sd, si) => {
      const scheduled = String((med as any)[sd.flag] || "0") !== "0";
      let status: "given" | "missed" | "pending" = "pending";
      if (scheduled) {
        if (rel < 0) status = (mi + si) % 5 === 0 ? "missed" : "given";
        else if (rel === 0) status = si <= 1 ? ((mi + si) % 6 === 0 ? "missed" : "given") : "pending";
        else status = "pending";
      }
      return { slot: sd.key, scheduled, dose: med.Dosage, time: sd.time, status };
    }),
  }));
}

// ---- Care plan: periodic assessments (Braden / fall risk / mobility / nutrition) ----
const ASSESSMENT_NOTES = [
  "Initial assessment on admission.",
  "Stable; continue current care plan.",
  "Improved mobility after physiotherapy.",
  "Nutrition plan adjusted with dietitian.",
  "Reduced fall risk; fewer assistive needs.",
  "Overall improvement; review in one month.",
];

export function assessmentsFor(personId: number) {
  const out = [];
  const base = now();
  const off = personId % 5;
  for (let i = 5; i >= 0; i--) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 15);
    const t = 5 - i; // progression 0..5
    out.push({
      Id: 900 + personId * 10 + t,
      PersonId: personId,
      AssessmentDate: isoDate(d),
      BradenScore: Math.min(23, 13 + t + (off % 2)),
      FallRiskScore: Math.max(15, 55 - t * 5 - off),
      MobilityScore: Math.min(95, 45 + t * 5 + off * 2),
      NutritionScore: Math.min(95, 50 + t * 4 + off),
      Notes: ASSESSMENT_NOTES[t % ASSESSMENT_NOTES.length],
      AssessorName: t % 2 === 0 ? "Petra Šimić" : "dr. Marko Jurić",
    });
  }
  return out;
}

// ---- Audit log (Log / LogEntity / LogType) — entity-change history ----
export function auditLogEntries(query: Record<string, string> = {}) {
  const pretty: Record<string, string> = {
    INSERT: "Kreiranje",
    UPDATE: "Promjena",
    DELETE: "Brisanje",
  };
  const pools = [
    { entity: "Person", items: PERSONS.map((p) => ({ id: p.Id, label: p.FirstName + " " + p.LastName })) },
    { entity: "Room", items: ROOMS.map((r) => ({ id: r.Id, label: r.Name })) },
    { entity: "Floor", items: FLOORS.map((f) => ({ id: f.Id, label: f.Name })) },
    { entity: "Contact", items: PERSONS.slice(0, 6).map((p) => ({ id: p.Id * 60 + 1, label: "Petar " + p.LastName })) },
  ];
  const seq = ["INSERT", "UPDATE", "UPDATE", "DELETE", "UPDATE", "INSERT"];
  const base = now();
  let id = 5000;
  let c = 0;
  const all: any[] = [];
  pools.forEach((pool) => {
    pool.items.forEach((item, i) => {
      const n = (i % 2) + 1;
      for (let k = 0; k < n; k++) {
        const action = seq[c % seq.length];
        const u = USERS[c % USERS.length];
        const d = new Date(
          base.getFullYear(), base.getMonth(), base.getDate() - (c % 30),
          8 + (c % 10), (c * 7) % 60, 0
        );
        all.push({
          Id: id++,
          CreationDate: d.toISOString(),
          Entity: pool.entity,
          EntityKey: "Id",
          ActionCode: action,
          ActionPretty: pretty[action],
          KeyId: item.id,
          RecordLabel: item.label,
          UserId: u.Id,
          UserName: u.FirstName + " " + u.LastName,
        });
        c++;
      }
    });
  });

  let rows = all;
  if (query["Entity"]) rows = rows.filter((r) => r.Entity === query["Entity"]);
  if (query["Action"]) rows = rows.filter((r) => r.ActionCode === query["Action"]);
  if (query["DateFrom"]) {
    const from = new Date(query["DateFrom"] + "T00:00:00").getTime();
    rows = rows.filter((r) => new Date(r.CreationDate).getTime() >= from);
  }
  if (query["DateTo"]) {
    const to = new Date(query["DateTo"] + "T23:59:59").getTime();
    rows = rows.filter((r) => new Date(r.CreationDate).getTime() <= to);
  }
  if (query["Search"]) {
    const s = query["Search"].toLowerCase();
    rows = rows.filter(
      (r) => (r.RecordLabel || "").toLowerCase().includes(s) || String(r.KeyId).includes(s)
    );
  }
  return rows.sort(
    (a, b) => new Date(b.CreationDate).getTime() - new Date(a.CreationDate).getTime()
  );
}

// ---- User activity feed (UserActivity table) — who did what, when ----
export function userActivityEntries(query: Record<string, string> = {}) {
  const acts = [
    { type: "INSERT_PERSON", desc: "Person inserted" },
    { type: "UPDATE_PERSON_DETAILED", desc: "Person details updated" },
    { type: "CHANGE_STATUS_PERSON", desc: "Person status changed" },
    { type: "INSERT_ROOM", desc: "Room inserted" },
    { type: "UPDATE_ROOM", desc: "Room updated" },
    { type: "CHANGE_ROOM_PERSON", desc: "Resident moved to another room" },
    { type: "INSERT_PERSON_ASSESSMENT", desc: "Person assessment inserted" },
    { type: "RECORD_MEDICATION_ADMINISTRATION", desc: "Medication administration recorded" },
    { type: "INSERT_CALCULATION", desc: "Calculation created" },
    { type: "LOGIN", desc: "User signed in" },
  ];
  const base = now();
  let id = 8000;
  const all: any[] = [];
  for (let i = 0; i < 40; i++) {
    const u = USERS[i % USERS.length];
    const a = acts[i % acts.length];
    const d = new Date(
      base.getFullYear(), base.getMonth(), base.getDate() - (i % 20),
      8 + (i % 11), (i * 11) % 60, 0
    );
    all.push({
      Id: id++,
      Timestamp: d.toISOString(),
      UserId: u.Id,
      UserName: u.FirstName + " " + u.LastName,
      ActivityType: a.type,
      Description: a.desc,
    });
  }
  let rows = all;
  if (query["DateFrom"]) {
    const f = new Date(query["DateFrom"] + "T00:00:00").getTime();
    rows = rows.filter((r) => new Date(r.Timestamp).getTime() >= f);
  }
  if (query["DateTo"]) {
    const t = new Date(query["DateTo"] + "T23:59:59").getTime();
    rows = rows.filter((r) => new Date(r.Timestamp).getTime() <= t);
  }
  if (query["Search"]) {
    const s = query["Search"].toLowerCase();
    rows = rows.filter(
      (r) =>
        r.ActivityType.toLowerCase().includes(s) ||
        (r.Description || "").toLowerCase().includes(s) ||
        r.UserName.toLowerCase().includes(s)
    );
  }
  return rows.sort(
    (a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime()
  );
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
    Mobile: "091 200 00" + Id, Active: active, DaysOfVacation: 25,
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
  const row = (n: number, year: number, from: string, to: string, taken: number, statusId: number) => {
    const s = VACATION_STATUSES.find((x) => x.Id === statusId);
    return {
      Id: employeeId * 100 + n, EmployeeId: employeeId, Year: year,
      FromDate: from, ToDate: to, DaysTaken: taken, DaysTotal: 25,
      StatusId: statusId, StatusName: s?.Name, StatusColor: s?.Color, StatusIcon: s?.Icon,
    };
  };
  return [
    row(1, yr, yr + "-07-01", yr + "-07-14", 10, 4),
    row(2, yr, yr + "-12-27", yr + "-12-31", 3, 2),
    row(3, yr - 1, (yr - 1) + "-08-05", (yr - 1) + "-08-20", 12, 4),
  ];
}

export function vacationSummaryFor(employeeId: number) {
  const yr = now().getFullYear();
  const rows = vacationsFor(employeeId).filter((v) => v.Year === yr);
  const total = 25;
  const taken = rows.filter((v) => v.StatusId === 4).reduce((s, v) => s + v.DaysTaken, 0);
  const inProgress = rows.filter((v) => v.StatusId === 2).reduce((s, v) => s + v.DaysTaken, 0);
  return {
    TotalDays: total,
    TotalDaysTaken: taken,
    InProgressDays: inProgress,
    RemainingDays: total - taken,
    AvailableDaysForReservation: total - taken - inProgress,
  };
}

// =====================================================================================
// SERVICES / PACKAGES / DISCOUNTS
// =====================================================================================
export const SERVICES = [
  { Id: 1, Name: "Basic care", Description: "Monthly resident care", CostPerUnit: 350, DefaultNumberOfUnits: 1, MeasureUnitId: 2, MeasureUnitName: "Month", MeasureUnitTag: "mo", MeasureUnitCode: "month", PriceUnitId: 1, PriceUnitName: "Monthly", PriceUnitTag: "mo", Quantity: 1, Price: 350 },
  { Id: 2, Name: "Accommodation", Description: "Room accommodation", CostPerUnit: 300, DefaultNumberOfUnits: 1, MeasureUnitId: 2, MeasureUnitName: "Month", MeasureUnitTag: "mo", MeasureUnitCode: "month", PriceUnitId: 1, PriceUnitName: "Monthly", PriceUnitTag: "mo", Quantity: 1, Price: 300 },
  { Id: 3, Name: "Physiotherapy", Description: "Individual therapy", CostPerUnit: 120, DefaultNumberOfUnits: 4, MeasureUnitId: 4, MeasureUnitName: "Piece", MeasureUnitTag: "pcs", MeasureUnitCode: "unit", PriceUnitId: 3, PriceUnitName: "Per piece", PriceUnitTag: "pcs", Quantity: 4, Price: 480 },
  { Id: 4, Name: "Medical services", Description: "Physician supervision", CostPerUnit: 200, DefaultNumberOfUnits: 1, MeasureUnitId: 4, MeasureUnitName: "Piece", MeasureUnitTag: "pcs", MeasureUnitCode: "unit", PriceUnitId: 1, PriceUnitName: "Monthly", PriceUnitTag: "mo", Quantity: 1, Price: 200 },
  { Id: 5, Name: "Meals", Description: "Three meals per day", CostPerUnit: 150, DefaultNumberOfUnits: 1, MeasureUnitId: 2, MeasureUnitName: "Month", MeasureUnitTag: "mo", MeasureUnitCode: "month", PriceUnitId: 1, PriceUnitName: "Monthly", PriceUnitTag: "mo", Quantity: 1, Price: 150 },
];

export const PACKAGES = [
  { Id: 1, Name: "Basic care package", Description: "Accommodation + basic care + meals", DefaultPackagePrice: 650, DefaultPackagePriceUnitId: 1, CalculationMeasureUnitId: "1", PackagePriceCalculated: true, PriceUnitName: "Monthly", PriceUnitTag: "mo", MeasureUnitName: "Month", MeasureUnitTag: "mo", MeasureUnitCode: "month", OfferMeasureUnit: "month", Price: 650, PriceRounded: "650.00" },
  { Id: 2, Name: "Extended care package", Description: "Basic + physiotherapy + medical supervision", DefaultPackagePrice: 850, DefaultPackagePriceUnitId: 1, CalculationMeasureUnitId: "1", PackagePriceCalculated: true, PriceUnitName: "Monthly", PriceUnitTag: "mo", MeasureUnitName: "Month", MeasureUnitTag: "mo", MeasureUnitCode: "month", OfferMeasureUnit: "month", Price: 850, PriceRounded: "850.00" },
  { Id: 3, Name: "Premium care package", Description: "Single room + full care", DefaultPackagePrice: 1100, DefaultPackagePriceUnitId: 1, CalculationMeasureUnitId: "1", PackagePriceCalculated: true, PriceUnitName: "Monthly", PriceUnitTag: "mo", MeasureUnitName: "Month", MeasureUnitTag: "mo", MeasureUnitCode: "month", OfferMeasureUnit: "month", Price: 1100, PriceRounded: "1,100.00" },
];

export function servicesForPackage(packageId: number) {
  const map: Record<number, number[]> = { 1: [1, 2, 5], 2: [1, 2, 5, 3, 4], 3: [1, 2, 5, 3, 4] };
  const ids = map[packageId] || [1, 2];
  return SERVICES.filter((s) => ids.includes(s.Id)).map((s) => ({
    Id: s.Id, ServiceName: s.Name, Name: s.Name, Quantity: s.Quantity, CostPerUnit: s.CostPerUnit, Price: s.Price,
    MeasureUnitId: s.MeasureUnitId, MeasureUnitTag: s.MeasureUnitTag, MeasureUnitCode: s.MeasureUnitCode,
    MeasureUnitName: s.MeasureUnitName, DefaultNumberOfUnits: s.DefaultNumberOfUnits,
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

export function userDataFor(id: string) {
  const u = USERS.find((x) => x.Id === id) || USERS[0];
  const role = ROLES.find((r) => r.RoleId === u.RoleId);
  return {
    User: { ...u, DateRegistered: "2022-01-01" },
    Roles: role ? [{ RoleId: role.RoleId, RoleName: role.RoleName, RoleDescription: role.Description }] : [],
    Permissions: [],
    Persons: [],
  };
}

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

export function furnitureStatusHistory(furnitureId: number) {
  const f = FURNITURE.find((x) => x.Id === furnitureId);
  const latest = f ? f.LatestStatusId : 1;
  const mk = (n: number, statusId: number, start: string, end: string | null) => {
    const s = FURNITURE_STATUSES.find((x) => x.Id === statusId);
    return {
      RowId: furnitureId * 100 + n, FurnitureId: furnitureId, FurnitureStatusId: statusId,
      StatusName: s?.Name, StatusColor: s?.Color, StatusIcon: s?.Icon,
      StartDate: start, EndDate: end,
    };
  };
  return [
    mk(1, 1, f ? f.CreationDate : "2021-01-05", "2023-06-10"),
    mk(2, 3, "2023-06-10", "2023-07-01"),
    mk(3, latest, "2023-07-01", null),
  ];
}

// =====================================================================================
// DOCTOR VISITS
// =====================================================================================
export const DOCTOR_VISITS = [
  { DoctorVisitId: 1, Id: 1, Date: isoOn(4, 9), Completed: true, Doctors: "dr. Marko Jurić, dr. Ana Kovač", Nurses: "Petra Šimić", NumberOfDoctors: 2, NumberOfNurses: 1, Persons: 3 },
  { DoctorVisitId: 2, Id: 2, Date: isoOn(11, 10), Completed: true, Doctors: "dr. Marko Jurić, dr. Ana Kovač", Nurses: "Petra Šimić", NumberOfDoctors: 2, NumberOfNurses: 1, Persons: 3 },
  { DoctorVisitId: 3, Id: 3, Date: isoOn(18, 9), Completed: false, Doctors: "dr. Marko Jurić, dr. Ana Kovač", Nurses: "Petra Šimić", NumberOfDoctors: 2, NumberOfNurses: 1, Persons: 3 },
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
    Documents: statusId === 1 ? 2 : statusId === 2 ? 1 : 0,
    StatusId: statusId,
    StatusName: CALCULATION_STATUSES.find((s) => s.Id === statusId)?.Name,
    StatusColor: CALCULATION_STATUSES.find((s) => s.Id === statusId)?.Color,
  };
});

export function calculationsForPerson(personId: number) {
  const out = [];
  for (let mo = 0; mo < 4; mo++) {
    const d = new Date(now().getFullYear(), now().getMonth() - mo, 1);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const statusId = mo === 0 ? 2 : 1;
    const status = CALCULATION_STATUSES.find((s) => s.Id === statusId);
    out.push({
      Id: 500 + personId * 10 + mo, PersonId: personId, Month: d.getMonth() + 1, Year: d.getFullYear(),
      DateFrom: d.getFullYear() + "-" + mm + "-01", DateTo: d.getFullYear() + "-" + mm + "-30",
      Range: "01." + mm + ". - 30." + mm + ".", CalculationDate: d.getFullYear() + "-" + mm + "-01",
      StatusId: statusId, StatusName: status?.Name, StatusColor: status?.Color,
      SystemPrice: 650, RealPrice: 650, PaidPrice: statusId === 1 ? 650 : 0,
      DatePaid: statusId === 1 ? d.getFullYear() + "-" + mm + "-05" : null,
      Documents: statusId === 1 ? 2 : 1,
    });
  }
  return out;
}

export function calculationsSummaryForPerson(personId: number) {
  const rows = calculationsForPerson(personId);
  return {
    TotalCalculatedPrice: rows.reduce((s, c) => s + c.SystemPrice, 0),
    TotalRealPrice: rows.reduce((s, c) => s + c.RealPrice, 0),
    TotalPaidPrice: rows.reduce((s, c) => s + c.PaidPrice, 0),
  };
}

// =====================================================================================
// ACCOMMODATION BOARD — { Persons, Floors, Rooms } (accomodation-management page)
// =====================================================================================
export function accommodationBoard() {
  const typeName = (cap: number) =>
    cap === 1 ? "Single room" : cap === 2 ? "Double room" : cap >= 3 ? "Triple room" : "Day care";
  return {
    Persons: PERSONS.map((p) => ({
      Id: p.Id, PersonId: p.Id, FirstName: p.FirstName, LastName: p.LastName,
      RoomId: p.RoomId, GenderId: p.GenderId, GenderName: p.GenderName,
      HealthConditionName: p.HealthConditionName,
    })),
    Floors: FLOORS.map((f) => ({ Id: f.Id, Name: f.Name })),
    Rooms: ROOMS.map((r) => {
      const taken = PERSONS.filter((p) => p.RoomId === r.Id).length;
      return {
        Id: r.Id, Name: r.Name, FloorId: r.FloorId, Capacity: r.Capacity,
        TakenSpace: taken, FreeSpace: r.Capacity - taken,
        RoomGenderId: r.RoomGenderId, AccommodationTypeName: typeName(r.Capacity),
        Width: r.Width, Height: r.Height, Top: r.Top, Left: r.Left,
      };
    }),
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
  const employeesByJobPosition = Object.keys(byJob).map((k) => ({
    JobPositionName: k,
    NumberOfEmployees: byJob[k],
    JobPositionIcon: JOB_POSITIONS.find((j) => j.Name === k)?.Icon || "fas fa-user",
  }));

  const oldest = [...PERSONS].sort((a, b) => new Date(a.BirthDate).getTime() - new Date(b.BirthDate).getTime())[0];
  const longest = [...PERSONS].sort((a, b) => new Date(a.StartDate).getTime() - new Date(b.StartDate).getTime())[0];

  const nowYear = base.getFullYear();
  const ageBuckets = [
    { Label: "< 80", Count: 0 },
    { Label: "80-84", Count: 0 },
    { Label: "85-89", Count: 0 },
    { Label: "90+", Count: 0 },
  ];
  PERSONS.forEach((p) => {
    const age = nowYear - new Date(p.BirthDate).getFullYear();
    if (age < 80) ageBuckets[0].Count++;
    else if (age < 85) ageBuckets[1].Count++;
    else if (age < 90) ageBuckets[2].Count++;
    else ageBuckets[3].Count++;
  });

  const occupancyByFloor = FLOORS.map((f) => {
    const floorRooms = ROOMS.filter((r) => r.FloorId === f.Id);
    return {
      FloorName: f.Name,
      Occupied: PERSONS.filter((p) => p.FloorId === f.Id).length,
      Capacity: floorRooms.reduce((s, r) => s + (r.Capacity || 0), 0),
    };
  });

  const byCond: Record<string, number> = {};
  PERSONS.forEach((p) => {
    const n = p.HealthConditionName || "Other";
    byCond[n] = (byCond[n] || 0) + 1;
  });
  const residentsByCondition = Object.keys(byCond).map((k) => ({ Name: k, Count: byCond[k] }));

  return {
    Summary: [{ TakenSpace: PERSONS.length, Capacity: capacity, MalePersons: males, FemalePersons: females }],
    LongestPerson: [{ FirstName: longest.FirstName, LastName: longest.LastName, StartDate: longest.StartDate }],
    OldestPerson: [{ FirstName: oldest.FirstName, LastName: oldest.LastName, BirthDate: oldest.BirthDate, Years: nowYear - new Date(oldest.BirthDate).getFullYear() }],
    ActivePersons: activePersons,
    EmployeesByGender: [{ FemaleEmployees: 4, MaleEmployees: 3 }],
    AllTimeEmployees: [{ Count: EMPLOYEES.length, CurrentEmployees: EMPLOYEES.filter((e) => e.Active).length }],
    Employees: EMPLOYEES,
    PersonWithLongestLastVisit: [{
      FirstName: PERSONS[2].FirstName,
      LastName: PERSONS[2].LastName,
      MonthsSinceLastVisit: 4,
      DaysSinceLastVisit: 12,
      VisitStatus: "danger",
    }],
    EmployeesByJobPosition: employeesByJobPosition,
    AgeDistribution: ageBuckets,
    OccupancyByFloor: occupancyByFloor,
    ResidentsByCondition: residentsByCondition,
    Events: EVENTS,
  };
}

// true when the logged-in demo account is the plain "User" role (RoleId 3) —
// that role only sees its own residents in care, not the whole facility.
export function demoIsUserRole(): boolean {
  try {
    const r = JSON.parse(localStorage.getItem("userRights") || "{}");
    return (r.Roles || []).some((x: any) => x.RoleId === 3);
  } catch {
    return false;
  }
}

// the residents assigned to the "User" role (his people in care)
export function personsInCare() {
  return PERSONS.slice(0, 2);
}

export function userDashboardSummary() {
  const count = demoIsUserRole() ? personsInCare().length : PERSONS.length;
  return [{ UnpaidCalculations: CALCULATIONS.filter((c) => !c.Paid).length, Persons: count }];
}

export function calculationSummary() {
  const totalSys = CALCULATIONS.reduce((s, c) => s + c.SystemPrice, 0);
  const totalReal = CALCULATIONS.reduce((s, c) => s + c.RealPrice, 0);
  const totalPaid = CALCULATIONS.reduce((s, c) => s + c.PaidPrice, 0);
  return {
    Summary: {
      TotalCalculatedPrice: totalSys,
      TotalCalculatedPriceDiff: "4",
      TotalRealPrice: totalReal,
      TotalRealPriceDiff: "3",
      TotalPaidPrice: totalPaid,
      TotalPaidPriceDiff: "6",
      Persons: PERSONS.length,
      CalculatedForPersons: PERSONS.length,
      NumberOfPaidCalculations: CALCULATIONS.filter((c) => c.StatusId === 1).length,
      NumberOfNotPaidCalculations: CALCULATIONS.filter((c) => c.StatusId === 2).length,
      NumberOfCancelledCalculations: CALCULATIONS.filter((c) => c.StatusId === 3).length,
    },
  };
}

// =====================================================================================
// NOTIFICATIONS
// =====================================================================================
export const NOTIFICATION_TYPES = [
  { Id: 1, Name: "Events", Code: "events", StringKey: "events", Enabled: true, DaysReminder: 2 },
  { Id: 2, Name: "Reminders", Code: "reminders", StringKey: "reminders", Enabled: true, DaysReminder: 2 },
  { Id: 3, Name: "Other", Code: "other", StringKey: "other", Enabled: true, DaysReminder: 2 },
];

export function notifications() {
  const base = now();
  const at = (daysAgo: number, h: number, m: number) =>
    new Date(base.getFullYear(), base.getMonth(), base.getDate() - daysAgo, h, m).toISOString();
  return [
    { Id: 1, Text: "Birthday reminder: Kata Novak has a birthday in 2 days.", CreationDate: at(0, 8, 15), Read: false, NotificationTypeId: 2, TypeCode: "reminders", TypeStringKey: "reminders", LinkId: 5, GoToLink: "/pages/profile/5" },
    { Id: 2, Text: "New event scheduled: Physiotherapy — group mobility exercise.", CreationDate: at(0, 7, 40), Read: false, NotificationTypeId: 1, TypeCode: "events", TypeStringKey: "events", LinkId: 0, GoToLink: "/pages/calendar" },
    { Id: 3, Text: "Ana Babić has not had a doctor visit in 4 months.", CreationDate: at(1, 16, 5), Read: false, NotificationTypeId: 3, TypeCode: "other", TypeStringKey: "other", LinkId: 3, GoToLink: "/pages/profile/3" },
    { Id: 4, Text: "Medication delivery due for Ivan Kovačević.", CreationDate: at(1, 9, 0), Read: true, NotificationTypeId: 2, TypeCode: "reminders", TypeStringKey: "reminders", LinkId: 2, GoToLink: "/pages/profile/2" },
    { Id: 5, Text: "Upcoming event: Doctor's round — resident rounds.", CreationDate: at(2, 11, 30), Read: true, NotificationTypeId: 1, TypeCode: "events", TypeStringKey: "events", LinkId: 0, GoToLink: "/pages/calendar" },
    { Id: 6, Text: "Stay anniversary: Marija Horvat — 3 years in care.", CreationDate: at(3, 10, 10), Read: true, NotificationTypeId: 2, TypeCode: "reminders", TypeStringKey: "reminders", LinkId: 1, GoToLink: "/pages/profile/1" },
    { Id: 7, Text: "Monthly occupancy report is ready to review.", CreationDate: at(4, 14, 0), Read: true, NotificationTypeId: 3, TypeCode: "other", TypeStringKey: "other", LinkId: 0, GoToLink: "/pages/dashboard" },
  ];
}

// =====================================================================================
// AUTH
// =====================================================================================
// demo login accounts — username selects the role (password can be anything).
// RoleId: 1 admin, 2 moderator, 3 user, 4 nurse, 5 caregiver, 8 doctor
export const DEMO_ACCOUNTS: Record<string, { RoleId: number; FirstName: string; LastName: string }> = {
  admin: { RoleId: 1, FirstName: "Demo", LastName: "Administrator" },
  moderator: { RoleId: 2, FirstName: "Demo", LastName: "Moderator" },
  user: { RoleId: 3, FirstName: "Demo", LastName: "User" },
  nurse: { RoleId: 4, FirstName: "Demo", LastName: "Nurse" },
  caregiver: { RoleId: 5, FirstName: "Demo", LastName: "Caregiver" },
  doctor: { RoleId: 8, FirstName: "Demo", LastName: "Doctor" },
};

export function demoLoginResponse(identifier: string) {
  const key = (identifier || "admin").toLowerCase().trim();
  const acc = DEMO_ACCOUNTS[key] || DEMO_ACCOUNTS["admin"];
  return {
    Authenticated: true,
    Token: "demo-jwt-token." + btoa(key) + ".signature",
    User: { Id: "demo-" + acc.RoleId, FirstName: acc.FirstName, LastName: acc.LastName, Username: key, Email: key + "@demo.local", DateRegistered: "2022-01-01" },
    Roles: [{ RoleId: acc.RoleId }],
    Permissions: [{ Code: "*", Name: "All permissions" }],
    Persons: acc.RoleId === 3 ? personsInCare().map((p) => p.Id) : [],
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

    // ---- clinical: MAR + care plan ----
    case path.startsWith("medication-administration"): return hit(marScheduleFor(pid(), query["Date"]));
    case path.includes("care-plan/assessments"):
    case path.startsWith("care-plan"): return hit(assessmentsFor(pid()));
    case path.includes("audit-log/user-activity"): return hit(userActivityEntries(query));
    case path.startsWith("audit-log"): return hit(auditLogEntries(query));

    // ---- dashboard ----
    case path.includes("summary/getDashboardSummary"): return hit(dashboardSummary());
    case path.includes("summary/getUserDashboardSummary"): return hit(userDashboardSummary());

    // ---- persons ----
    case path.includes("persons/getPersonsForUserDashboard"):
    case path.includes("persons/getPersonsForUser"):
      return hit((demoIsUserRole() ? personsInCare() : PERSONS.slice(0, 5)).map((p) => {
        const s = new Date(p.StartDate);
        const n = now();
        return { ...p, SpentTime: (n.getFullYear() - s.getFullYear()) * 12 + (n.getMonth() - s.getMonth()) };
      }));
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
    case path.includes("calculation/getCalculationsSummaryForPerson"): return hit(calculationsSummaryForPerson(pid()));
    case path.includes("calculation/getCalculationsForPerson"): return hit(calculationsForPerson(pid()));
    case path.includes("calculation/calculationDocuments"):
      return hit([
        { Id: 1, Name: "Invoice", Extension: "pdf", FileType: "application/pdf", CreationDate: isoOn(5, 9) },
        { Id: 3, Name: "Offer", Extension: "pdf", FileType: "application/pdf", CreationDate: isoOn(1, 9) },
      ]);
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
    case path.includes("notes/getNoteDetails"): {
      const nid = Number(query["NoteId"]) || 0;
      if (nid >= 900000) return hit(visitNoteFor(nid - 900000));
      const personId = Math.floor(nid / 70) || 1;
      const note = notesFor(personId)[0];
      return hit(note ? { ...note, Documents: [] } : {});
    }
    case path.startsWith("notes"): {
      const ns = notesFor(pid());
      const tags: any[] = [];
      ns.forEach((n) => (n.Tags || []).forEach((t) => tags.push({ ...t, NoteId: n.Id })));
      return hit({ Notes: ns, Tags: tags, Documents: [] });
    }
    case path.startsWith("contacts"): return hit(contactsFor(pid()));

    // ---- doctor visits ----
    case path.includes("doctor-visits/getDoctorsAndNurses"):
      return hit({
        doctors: EMPLOYEES.filter((e) => e.JobPositionId === 5).map((e) => ({
          EmployeeId: e.Id, FirstName: e.FirstName, LastName: e.LastName, JobPositionName: e.JobPositionName, JMBG: e.JMBG, Icon: "fas fa-user-md",
        })),
        nurses: EMPLOYEES.filter((e) => e.JobPositionId === 2).map((e) => ({
          EmployeeId: e.Id, FirstName: e.FirstName, LastName: e.LastName, JobPositionName: e.JobPositionName, JMBG: e.JMBG, Icon: "fas fa-user-nurse",
        })),
      });
    case path.includes("doctor-visits/getPersons"):
      return hit(PERSONS.slice(0, 3).map((p) => ({
        Id: p.Id, FirstName: p.FirstName, LastName: p.LastName, JMBG: p.JMBG, Active: true, NoteId: 900000 + p.Id,
      })));
    case path.includes("doctor-visits/getSummary"):
      return hit({
        TimePassed: { MonthsDifference: 1, DaysDifference: 13 },
        Visited: { TotalPersons: PERSONS.length, VisitedPersons: 3 },
        DoctorStats: [
          { DoctorId: 3, FirstName: "Marko", LastName: "Jurić", NumberOfCompletedVisits: 8 },
          { DoctorId: 5, FirstName: "Ana", LastName: "Kovač", NumberOfCompletedVisits: 12 },
        ],
      });
    case path.includes("doctor-visits/getVisitTourDetails"):
      return hit({
        Tour: [DOCTOR_VISITS[0]],
        Doctors: EMPLOYEES.filter((e) => e.JobPositionId === 5).map((e) => ({ FirstName: e.FirstName, LastName: e.LastName, JobPositionName: e.JobPositionName })),
        Nurses: EMPLOYEES.filter((e) => e.JobPositionId === 2).map((e) => ({ FirstName: e.FirstName, LastName: e.LastName, JobPositionName: e.JobPositionName })),
      });
    case path.startsWith("doctor-visits"): return hit(DOCTOR_VISITS);

    // ---- employees / vacations ----
    case path.includes("employees/employeeDetails"):
    case path.includes("employees/EmployeeDetailed"):
      return hit([EMPLOYEES.find((e) => e.Id === Number(query["id"])) || EMPLOYEES[0]]);
    case path.includes("employees/getUserEmployeeId"): return hit([{ EmployeeId: 1 }]);
    case path.startsWith("employees"): return hit(EMPLOYEES);
    case path.includes("vacations/getRemainingVacationDays"):
      return hit(vacationSummaryFor(Number(query["id"] || query["EmployeeId"] || query["employeeId"]) || 1));
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
    case path.includes("users/getUserData"): return hit(userDataFor(query["id"] || query["Id"] || "u1"));
    case path.startsWith("users"): return hit(USERS);

    // ---- furniture ----
    case path.includes("furniture/getFurnitureCountByStatus"):
      return hit(FURNITURE_STATUSES.map((s) => ({ ...s, Furniture: FURNITURE.filter((f) => f.LatestStatusId === s.Id).length })));
    case path.includes("furniture/getFurnitureStatuses"):
      return hit(furnitureStatusHistory(Number(query["FurnitureId"]) || 1));
    case path.startsWith("furniture-statuses"): return hit(FURNITURE_STATUSES);
    case path.startsWith("furniture"):
      return hit(FURNITURE.map((f) => {
        const s = FURNITURE_STATUSES.find((x) => x.Id === f.LatestStatusId);
        const r = ROOMS.find((x) => x.Id === f.RoomId);
        return { ...f, LatestStatusName: s?.Name, StatusColor: s?.Color, StatusIcon: s?.Icon, RoomName: r?.Name, FloorName: r?.FloorName };
      }));

    // ---- rooms (accommodation board must come before generic rooms) ----
    case path.includes("rooms/getAccomodationManagementRooms"): return hit(accommodationBoard());
    case path.includes("rooms/getRoomsForFloor"):
      return hit(ROOMS.filter((r) => r.FloorId === Number(query["FloorId"] || query["floorId"] || query["id"])));
    case path.includes("rooms/getAvaliableRooms"):
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
    case path.includes("notifications/notificationTypes"): return hit(NOTIFICATION_TYPES.map((t) => ({ ...t })));
    case path.includes("notifications/getNotificationsSettings"): return hit(NOTIFICATION_TYPES.map((t) => ({ ...t })));
    case path.includes("notifications/getLatestNotifications"): return hit(notifications());
    case path.includes("notifications/getAllNotifications"): return hit(notifications());
    case path.includes("notifications/checkNotificationsStatus"):
      return hit([{ NotificationNumber: notifications().filter((n) => !n.Read).length }]);
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
function isoDate(d: Date) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function isoOn(day: number, hour: number) {
  return new Date(now().getFullYear(), now().getMonth(), day, hour, 0, 0).toISOString();
}
