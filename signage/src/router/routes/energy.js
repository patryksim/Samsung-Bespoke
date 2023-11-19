export default [
  {
    path: '/baseChart',
    name: 'BaseChartPage',
    component: () => import('@stViews/BaseChartPage.vue'),
  },
  {
    path: '/smartthings/energyIndex',
    name: 'EnergyPageIndex',
    component: () => import('@stViews/energy/EnergyPageIndex.vue'),
  },
  {
    path: '/smartthings/energy1',
    name: 'EnergyPage1',
    component: () => import('@stViews/energy/EnergyPage1.vue'),
  },
  {
    path: '/smartthings/energy2',
    name: 'EnergyPage2',
    component: () => import('@stViews/energy/EnergyPage2.vue'),
  },
  {
    path: '/smartthings/energy3',
    name: 'EnergyPage3',
    component: () => import('@stViews/energy/EnergyPage3.vue'),
  },
  {
    path: '/smartthings/tabEnergyIndex',
    name: 'TabEnergyPageIndex',
    component: () => import('@stViews/energy/TabEnergyPageIndex.vue'),
  },
  {
    path: '/smartthings/tabEnergy1',
    name: 'TabEnergyPage1',
    component: () => import('@stViews/energy/TabEnergyPage1.vue'),
  },
  {
    path: '/smartthings/tabEnergy2',
    name: 'TabEnergyPage2',
    component: () => import('@stViews/energy/TabEnergyPage2.vue'),
  },
  {
    path: '/smartthings/tabEnergy3',
    name: 'TabEnergyPage3',
    component: () => import('@stViews/energy/TabEnergyPage3.vue'),
  },
  {
    path: '/smartthings/tabEnergy4',
    name: 'TabEnergyPage4',
    component: () => import('@stViews/energy/TabEnergyPage4.vue'),
  },
  {
    path: '/smartthings/tabEnergy5',
    name: 'TabEnergyPage5',
    component: () => import('@stViews/energy/TabEnergyPage5.vue'),
  },
];
