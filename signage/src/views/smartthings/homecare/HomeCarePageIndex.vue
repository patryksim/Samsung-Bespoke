<template>
  <page-index-vue
    :is-tablet="false"
    chapterMenu="homecare"
    chapterTitle="Home Care"
    chapterDesc="Diagnose your devices"
  >
    <ul>
      <li>
        <page-index-title>AI diagnosis</page-index-title>
        <page-index-desc>
          SmartThings monitors your device and alerts<br />
          you if something goes wrong
        </page-index-desc>
      </li>

      <li>
        <page-index-title>Device care</page-index-title>
        <page-index-desc>
          Check your device’s status and your usage pattern
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
