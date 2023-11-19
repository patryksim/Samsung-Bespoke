import socket from '@/api/socket';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';

let timeoutInterval = null;

const setTimer = () => setTimeout(() => {
  if (window.location.hash.includes('tab')) {
    document.location.href = '/viewer/#/smartthings';
  }
}, process.env.NODE_ENV === 'production' ? 1000 * 60 * 3 : 5 ** 10);
const resetTimer = () => {
  clearTimeout(timeoutInterval);

  timeoutInterval = setTimer();
};

const routeList = routes.map((item) => ({
  ...item,
  meta: {
    isSmartThings: item.path.includes('/smartthings'),
    isLastPage: item.last === true,
    isTabletPage: item.name.includes('Tab'),
  },
}));

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/smartthings',
      name: 'LandingPage',
      component: () => import('@stViews/LandingPage.vue'),
      meta: {
        isSmartThings: true,
        isLandingPage: true,
        isTabletPage: true,
      },
    },
    {
      path: '/smartthings/43inch',
      name: 'LandingPage43Inch',
      component: () => import('@stViews/LandingPage43Inch.vue'),
      meta: {
        isSmartThings: true,
        isLandingPage: true,
        isTabletPage: false,
      },
    },
    ...routeList,
  ],
});

const routeStep = routes.map((item) => item.path);
// to: 이동할 페이지, from: 현재 페이지
router.afterEach((to, from) => {
  const toStep = routeStep.indexOf(to.path);
  const fromStep = routeStep.indexOf(from.path);
  to.meta.transitionName = toStep < fromStep ? 'slide-right' : 'slide-left';

  if (to.meta.isSmartThings) {
    if (to.meta.isTabletPage && to.name !== 'InteriorPage') resetTimer();

    socket.emit(to.name);
  }
});

export default router;
