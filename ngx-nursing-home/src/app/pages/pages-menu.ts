import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'COMPONENTS',
    group: true
  },
  {
    title: 'Filepicker',
    icon: 'download-outline',
    link: '/pages/filepicker',
  },
  {
    title: 'File cards',
    icon: 'file-outline',
    link: '/pages/file-cards',
  },
  {
    title: 'Progressbar-spinner',
    icon: 'loader-outline',
    link: '/pages/progressbar-spinner',
  },
  {
    title: 'Autocomplete',
    icon: 'text-outline',
    link: '/pages/autocomplete',
  },
  {
    title: 'Select-grid',
    icon: 'credit-card-outline',
    link: '/pages/select-grid',
  },
  {
    title: 'Schedule',
    icon: 'calendar-outline',
    link: '/pages/schedule',
  },
  {
    title: 'Smart-table',
    icon: 'layout-outline',
    children: [
      {
        title: 'Primjer - inline',
        link: '/pages/smart-table-inline',
      },
      {
        title: 'Primjer - external',
        link: '/pages/smart-table-external',
      },
      {
        title: 'Primjer - popup',
        link: '/pages/smart-table-popup',
      },
      {
        title: 'Postavke',
        link: '/pages/smart-table-postavke',
      },
    ]
  },
];
