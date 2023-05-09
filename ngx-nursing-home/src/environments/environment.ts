export enum SidebarStates {
  COLLAPSED = "collapsed",
  EXPANDED = "expanded",
  COMPACT = "compact",
}

const notificationTypes = [
  { code: 'all', stringKey: 'all' },
  { code: 'events', stringKey: 'events' },
  { code: 'reminders', stringKey: 'reminders' }
];

export const environment = {
  production: false,
  sidebarConfig: SidebarStates.COMPACT,
  configFile: 'assets/config/config.json',
  notificationTypes: notificationTypes,
};

