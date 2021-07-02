import Vue from 'vue';

import TheBanner from '@/components/global/TheBanner';

import EmptyPlaceholder from '@/components/global/EmptyPlaceholder';

import TheLoader from '@/components/global/TheLoader';

import MedPopup from '@/components/global/MedPopup';

import { VTooltip, VPopover, VClosePopover } from 'v-tooltip';

Vue.component('TheBanner', TheBanner);
Vue.component('EmptyPlaceholder', EmptyPlaceholder);
Vue.component('TheLoader', TheLoader);
Vue.component('MedPopup', MedPopup);

Vue.directive('tooltip', VTooltip);
Vue.directive('close-popover', VClosePopover);
Vue.component('VPopover', VPopover);
Vue.use(VTooltip);
