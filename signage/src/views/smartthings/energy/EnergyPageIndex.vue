<template>
  <page-index-vue
    :is-tablet="false"
    chapterMenu="energy"
    chapterTitle="Energy"
    chapterDesc="Save more money"
  >
    <ul>
      <li>
        <page-index-title>Monitor energy usage</page-index-title>
        <page-index-desc>
          Track your energy usage and estimated cost <br />
          daily, weekly, monthly
        </page-index-desc>
      </li>
      <li>
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

export default {
  components: {
    PageIndexVue,
    PageIndexTitle,
    PageIndexDesc,
  },
};
</script>
