/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export enum SidebarStates {
  COLLAPSED = "collapsed",
  EXPANDED = "expanded",
  COMPACT = "compact",
}

export const environment = {
  production: true,
  sidebarConfig: SidebarStates.COMPACT,
  configFile: 'assets/config/config.json',
};
