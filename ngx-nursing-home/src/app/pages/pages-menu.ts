import { NbMenuItem } from '@nebular/theme';
import { getString } from '../resources/strings';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: getString("dashboard"),
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
];