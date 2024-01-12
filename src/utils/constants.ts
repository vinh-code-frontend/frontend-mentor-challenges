import { markRaw } from 'vue';
import { IFooterIcon, IInitData } from './model';
import IconFacebookVue from '../components/icons/IconFacebook.vue';
import IconInstagramVue from '../components/icons/IconInstagram.vue';
import IconPinterestVue from '../components/icons/IconPinterest.vue';

const DAYS_UNIT: number = 24 * 60 * 60;
const HOURS_UNIT: number = 60 * 60;
const MINUTES_UNIT: number = 60;

const INIT_DATA: IInitData[] = [
  {
    id: 1,
    value: 0,
    label: 'Days'
  },
  {
    id: 2,
    value: 0,
    label: 'Hours'
  },
  {
    id: 3,
    value: 0,
    label: 'Minutes'
  },
  {
    id: 4,
    value: 0,
    label: 'Seconds'
  }
];

const SVG_ICONS: IFooterIcon<'svg'>[] = [
  {
    id: 1,
    value: 'icon-facebook.svg',
    component: markRaw(IconFacebookVue)
  },
  {
    id: 2,
    value: 'icon-instagram.svg',
    component: markRaw(IconInstagramVue)
  },
  {
    id: 3,
    value: 'icon-pinterest.svg',
    component: markRaw(IconPinterestVue)
  }
];

export { DAYS_UNIT, HOURS_UNIT, MINUTES_UNIT, INIT_DATA, SVG_ICONS };
