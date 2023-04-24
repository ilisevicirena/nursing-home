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
    icon: 'pantone-outline',
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
];