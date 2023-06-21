import { NbMenuItem } from '@nebular/theme';
import { getString } from '../resources/strings';
import { icon } from 'leaflet';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: getString("dashboard"),
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: getString('personsManagement'),
    icon: "people-outline",
    children: [
      {
        title: getString("persons"),
        link: '/pages/persons',
      },
      {
        title: getString("searchPersons"),
        link: '/pages/advanced-search',
      },
      {
        title: getString("addPerson"),
        link: '/pages/new-person',
      },
    ]
  },
  {
    title: getString("accomodationManagement"),
    icon: "pantone-outline",
    children: [
      {
        title: getString("roomManagement"),
        link: '/pages/room-management',
      },
      {
        title: getString("accomodationManagementRoom"),
        link: '/pages/accomodation-management',
      },
    ]
  },
  {
    title: getString("servicesManagement"),
    icon: 'settings-outline',
    children: [
      {
        title: getString("servicesSingle"),
        link: '/pages/services'
      },
      {
        title: getString("packages"),
        link: '/pages/packages'
      },
      {
        title: getString("discounts"),
        link: '/pages/discounts'
      },
      {
        title: getString("servicesManagementSingle"),
        link: '/pages/services-management'
      },
    ]
  },
  {
    title: getString('calendar'),
    icon: 'calendar-outline',
    link: '/pages/calendar'
  }
];