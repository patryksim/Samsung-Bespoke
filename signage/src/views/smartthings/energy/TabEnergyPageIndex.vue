<template>
  <page-index-vue
    chapterMenu="energy"
    chapterTitle="Energy"
    chapterDesc="Save more money"
  >
    <ul>
      <li @click="movePage('TabEnergyPage2',0,{sc:'y'})">
        <page-index-title>Monitor energy usage</page-index-title>
        <page-index-desc>
          Track your energy usage and estimated cost <br />
          daily, weekly, monthly
        </page-index-desc>
      </li>
      <li @click="movePage('TabEnergyPage3',0,{sc:'y'})">
        <page-index-title>AI Energy mode</page-index-title>
        <page-index-desc>
          Manage and save energy according to your set goal <br />
          and predicted monthly usage
        </page-index-desc>
      </li>
    </ul>
  </page-index-vue>
</template>

<script>
import PageIndexVue, { PageIndexTitle, PageIndexDesc } from '@/components/smartthings/PageIndex.vue';
import { onMounted } from 'vue';
import { useMutations } from '@/store/helper';
import movePage from '@/composables/movePage';

export default {
  components: {
    PageIndexVue,
    PageIndexTitle,
    PageIndexDesc,
  },
  setup() {
    const { setLineChart } = useMutations();

    onMounted(() => {
      setLineChart(false);
    });

    return {
      movePage,
    };
  },
};
</script>
