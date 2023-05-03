import { NbMenuItem } from '@nebular/theme';
import { getString } from '../resources/strings';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: getString("dashboard"),
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: getString("roomManagement"),
    icon: 'pantone-outline',
    link: '/pages/room-management',
  },
  {
    title: getString("accomodationManagement"),
    icon: 'swap-outline',
    link: '/pages/accomodation-management',
  },
  {
    title: getString("persons"),
    icon: 'people-outline',
    link: '/pages/persons',
  },
  {
    title: getString("addPerson"),
    icon: 'person-add-outline',
    link: '/pages/new-person',
  },
  {
    title: getString("searchPersons"),
    icon: 'search-outline',
    link: '/pages/advanced-search',
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
  }
];