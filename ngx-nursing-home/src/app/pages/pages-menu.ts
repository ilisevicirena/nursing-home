import { getString } from "../resources/strings";
import { ModulesMenuComponent } from "./modules-menu/modules-menu.component";
import { StartCalculationComponent } from "./calculation/start-calculation/start-calculation.component";
import { StartDoctorVisitTourComponent } from "./start-doctor-visit-tour/start-doctor-visit-tour.component";

export const USER_MENU_ITEMS: any[] = [
  {
    title: getString("dashboard"),
    icon: "home-outline",
    link: "/pages/dashboard",
  },
  {
    title: getString("calendar"),
    icon: "calendar-outline",
    link: "/pages/calendar",
  },
];

export const ADMIN_MENU_ITEMS: any[] = [
  {
    title: getString("dashboard"),
    icon: "home-outline",
    link: "/pages/dashboard",
  },
  {
    title: getString("personsManagement"),
    icon: "people-outline",
    children: [
      {
        title: getString("persons"),
        link: "/pages/persons",
      },
      {
        title: getString("searchPersons"),
        link: "/pages/advanced-search",
      },
      {
        title: getString("addPerson"),
        link: "/pages/new-person",
      },
    ],
  },
  {
    title: getString("employeesManagement"),
    icon: "briefcase-outline",
    children: [
      {
        title: getString("employees"),
        link: "/pages/employees",
      },
      {
        title: getString("addEmployee"),
        link: "/pages/new-employee",
      },
    ],
  },
  {
    title: getString("accomodationManagement"),
    icon: "pantone-outline",
    children: [
      {
        title: getString("roomManagement"),
        link: "/pages/room-management",
      },
      {
        title: getString("accomodationManagementRoom"),
        link: "/pages/accomodation-management",
      },
      {
        title: getString("furnitureManagement"),
        link: "/pages/furniture",
      },
    ],
  },
  {
    title: getString("calendar"),
    icon: "calendar-outline",
    link: "/pages/calendar",
  },
  {
    title: getString("calculationPage"),
    icon: "play-circle-outline",
    link: "/pages/calculation",
  },
  {
    title: getString("doctorVisits"),
    icon: "activity-outline",
    link: "/pages/doctor-visits",
  },
  {
    title: "Clinical care",
    icon: "heart-outline",
    children: [
      {
        title: "Medication administration",
        link: "/pages/medication-administration",
      },
      {
        title: "Care plans & assessments",
        link: "/pages/care-plan",
      },
    ],
  },
  {
    title: getString("allModules"),
    icon: "keypad-outline",
    link: undefined,
    component: ModulesMenuComponent,
  },
];

export const NURSE_MENU_ITEMS: any[] = [
  {
    title: getString("dashboard"),
    icon: "home-outline",
    link: "/pages/dashboard",
  },
  {
    title: getString("personsManagement"),
    icon: "people-outline",
    children: [
      {
        title: getString("persons"),
        link: "/pages/persons",
      },
      {
        title: getString("searchPersons"),
        link: "/pages/advanced-search",
      },
    ],
  },
  {
    title: getString("accomodationManagementRoom"),
    icon: "pantone-outline",
    link: "/pages/accomodation-management",
  },
  {
    title: getString("calendar"),
    icon: "calendar-outline",
    link: "/pages/calendar",
  },
  {
    title: getString("doctorVisits"),
    icon: "activity-outline",
    link: "/pages/doctor-visits",
  },
  {
    title: getString("newDoctorVisit"),
    icon: "play-circle-outline",
    link: undefined,
    component: StartDoctorVisitTourComponent,
  },
  {
    title: "Clinical care",
    icon: "heart-outline",
    children: [
      {
        title: "Medication administration",
        link: "/pages/medication-administration",
      },
      {
        title: "Care plans & assessments",
        link: "/pages/care-plan",
      },
    ],
  },
  {
    title: getString("vacation"),
    icon: "smiling-face-outline",
    link: "/pages/employee-vacations",
  },
  {
    title: getString("myData"),
    icon: "person-outline",
    link: "/pages/my-data",
  },
];

export const MENU_ITEMS: any[] = [
  {
    title: getString("personsManagement"),
    icon: "people-outline",
    subtitle: getString("personsManagementSubtitle"),
    color: "#8c63c9",
    children: [
      {
        title: getString("persons"),
        link: "/pages/persons",
      },
      {
        title: getString("searchPersons"),
        link: "/pages/advanced-search",
      },
      {
        title: getString("addPerson"),
        link: "/pages/new-person",
      },
    ],
  },
  {
    title: getString("employeesManagement"),
    icon: "briefcase-outline",
    color: "#35A9FC",
    subtitle: getString("employeesManagementSubtitle"),
    children: [
      {
        title: getString("employees"),
        link: "/pages/employees",
      },
      {
        title: getString("addEmployee"),
        link: "/pages/new-employee",
      },
    ],
  },
  {
    title: getString("usersManagement"),
    icon: "shield-outline",
    color: "#FFA32B",
    subtitle: getString("usersManagementSubtitle"),
    children: [
      {
        title: getString("users"),
        link: "/pages/users",
      },
      {
        title: "Audit log",
        link: "/pages/audit-log",
      },
    ],
  },
  {
    title: getString("appSettings"),
    icon: "settings-2-outline",
    color: "#8B8B8B",
    link: "/pages/app-settings",
  },
  {
    title: getString("accomodationManagement"),
    icon: "pantone-outline",
    color: "#FF444E",
    subtitle: getString("accomodationManagementSubtitle"),
    children: [
      {
        title: getString("roomManagement"),
        link: "/pages/room-management",
      },
      {
        title: getString("accomodationManagementRoom"),
        link: "/pages/accomodation-management",
      },
      {
        title: getString("furnitureManagement"),
        link: "/pages/furniture",
      },
    ],
  },
  {
    title: getString("servicesManagement"),
    icon: "settings-outline",
    color: "#72C627",
    subtitle: getString("servicesManagementSubtitle"),
    children: [
      {
        title: getString("servicesSingle"),
        link: "/pages/services",
      },
      {
        title: getString("packages"),
        link: "/pages/packages",
      },
      {
        title: getString("discounts"),
        link: "/pages/discounts",
      },
      {
        title: getString("servicesManagementSingle"),
        link: "/pages/services-management",
      },
    ],
  },
  {
    title: getString("calendar"),
    color: "#428058",
    subtitle: getString("calendarSubtitle"),
    icon: "calendar-outline",
    link: "/pages/calendar",
  },
  {
    title: getString("calculationPage"),
    icon: "play-circle-outline",
    color: "#283593",
    subtitle: getString("calculationSubtitle"),
    children: [
      {
        title: getString("calculationPage"),
        link: "/pages/calculation",
      },
      {
        title: getString("startCalculation"),
        component: StartCalculationComponent,
      },
    ],
  },
  {
    title: getString("doctorVisits"),
    icon: "activity-outline",
    color: "#517594",
    subtitle: getString("doctorVisitsSubtitle"),
    children: [
      {
        title: getString("doctorVisits"),
        link: "/pages/doctor-visits",
      },
      {
        title: getString("startDoctorVisit"),
        component: StartDoctorVisitTourComponent,
      },
    ],
  },
  {
    title: "Clinical care",
    icon: "heart-outline",
    color: "#e0407b",
    subtitle: "Medication records & resident assessments",
    children: [
      {
        title: "Medication administration",
        link: "/pages/medication-administration",
      },
      {
        title: "Care plans & assessments",
        link: "/pages/care-plan",
      },
    ],
  },
  {
    title: getString("codebooks"),
    icon: "settings-2-outline",
    color: "#f06292",
    subtitle: getString("codebooksSubtitle"),
    children: [
      {
        title: getString("tagsManagement"),
        link: "/pages/tags",
      },
      {
        title: getString("cities"),
        link: "/pages/cities",
      },
      {
        title: getString("municipalities"),
        link: "/pages/municipalities",
      },
      {
        title: getString("categories"),
        link: "/pages/categories",
      },
      {
        title: getString("furnitureStatuses"),
        link: "/pages/furniture-statuses",
      },
    ],
  },
];
