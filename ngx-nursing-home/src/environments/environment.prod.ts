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

const notificationTypes = [
  { code: 'all', stringKey: 'all' },
  { code: 'events', stringKey: 'events' },
  { code: 'reminders', stringKey: 'reminders' }
];

const Brand = {
  Name: 'Nursing home',
  Address: 'Bana Jelačića BB',
  City: 'Donja Mahala',
  PostalCode: '76 274',
  Email: 'test@test.com',
  Telephone: '031 741 255',
  Mobile: '+387 63 255 255'
};

export const environment = {
  production: true,
  sidebarConfig: SidebarStates.COMPACT,
  configFile: 'assets/config/config.json',
  notificationTypes: notificationTypes,
  brand: Brand,
};
