export enum SidebarStates {
  COLLAPSED = "collapsed",
  EXPANDED = "expanded",
  COMPACT = "compact",
}

export const environment = {
  production: false,
  sidebarConfig: SidebarStates.COMPACT,
};
