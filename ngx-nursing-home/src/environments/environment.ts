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
  Name: "Ngx nursing home",
  Address: "Adresa 123",
  City: "Donja Mahala",
  PostalCode: "76 274",
  Email: "sample@nursinghome.com",
  Telephone: "031 741 255",
  Mobile: "+387 63 255 255",
};

const Colors = [
  "success",
  "#e8eb34",
  "warning",
  "danger",
  "primary",
  "info",
  "#7b32a8",
  "#a83273",
  "#241454",
  "#082b12",
  "#39373b",
];

export const environment = {
  production: false,
  sidebarConfig: SidebarStates.COMPACT,
  configFile: "assets/config/config.json",
  translationFile: "assets/resources/strings-hr.json",
  notificationAllType: notificationAllType,
  brand: Brand,
  colors: Colors,
  kmPriceUnitId: 1,
};
