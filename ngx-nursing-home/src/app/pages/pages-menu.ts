import { icon } from "leaflet";
import { getString } from "../resources/strings";
import { DialogService } from "../shared/dialog/dialog.service";
import { FastActionsComponent } from "./fast-actions/fast-actions.component";

export const USER_MENU_ITEMS: any[] = [
  {
    title: getString("dashboard"),
    icon: "home-outline",
    link: "/pages/dashboard",
  },
  {
    title: getString("persons"),
    link: "/pages/persons",
    icon: "people-outline",
  },
  {
    title: getString("calendar"),
    icon: "calendar-outline",
    link: "/pages/calendar",
  },
];

export const MENU_ITEMS: any[] = [
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
    title: getString("servicesManagement"),
    icon: "settings-outline",
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
    title: getString("fastActions"),
    icon: "grid-outline",
    link: undefined,
    click: (dialogService: DialogService) => {
      dialogService.open(FastActionsComponent, {
        autoFocus: false,
      });
    },
  },
  {
    title: getString("settings"),
    icon: "settings-2-outline",
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
