<template>
  <page-index-vue
    :is-tablet="false"
    chapterMenu="aircare"
    chapterTitle="Air Care"
    chapterDesc="Make home fresher"
  >
    <ul>
      <li>
        <page-index-title>Air graphic</page-index-title>
        <page-index-desc>
          Monitor the quality of air in your home
        </page-index-desc>
      </li>

      <li>
        <page-index-title>Air quality keeper</page-index-title>
        <page-index-desc>
          Keep your air quality with automatic air purifier control
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
