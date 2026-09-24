// DEMO MODE environment — used by `ng build/serve -c demo`.
// Same as production, but turns on the in-memory mock backend (no API/DB required).
export enum SidebarStates {
  COLLAPSED = "collapsed",
  EXPANDED = "expanded",
  COMPACT = "compact",
}

const notificationAllType = {
  Code: "all",
  StringKey: "all",
  Notifications: [],
  UnreadNotificationCount: 0,
};

const Brand = {
  Name: "Dom za stare i nemoćne osobe (DEMO)",
  Address: "Ulica primjera 1",
  City: "Zagreb",
  PostalCode: "10000",
  Email: "demo@demo.local",
  Telephone: "01 555 0000",
  Mobile: "+385 91 555 0000",
};

const Colors = [
  "success",
  "#e8eb34",
  "warning",
  "danger",
  "#34bdeb",
  "info",
  "#7b32a8",
  "#a83273",
  "#241454",
  "#082b12",
  "#39373b",
];

export const environment = {
  production: true,
  demo: true,
  sidebarConfig: SidebarStates.COMPACT,
  configFile: "assets/config/config.demo.json",
  translationFile: "assets/resources/strings-en.json",
  locale: "en",
  notificationAllType: notificationAllType,
  brand: Brand,
  colors: Colors,
  kmPriceUnitId: 1,
};
