export default [
  {
    path: '/setup',
    name: 'SetupSignage',
    component: () => import('@/views/bespoke/SetupSignage.vue'),
  },
  {
    path: '/',
    name: 'InteriorPage',
    component: () => import('@/views/bespoke/InteriorPage.vue'),
  },
  {
    path: '/previewMode',
    name: 'PreviewMode',
    component: () => import('@/views/bespoke/ProductPreviewPage.vue'),
  },
  {
    path: '/product',
    name: 'ProductDetailPage',
    component: () => import('@/views/bespoke/ProductDetailPage.vue'),
  },
  {
    path: '/preview',
    name: 'PreviewPage',
    component: () => import('@/views/bespoke/PreviewPage.vue'),
  },
];
