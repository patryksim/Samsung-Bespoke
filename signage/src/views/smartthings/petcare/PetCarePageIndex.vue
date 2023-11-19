<template>
  <page-index-vue
    :is-tablet="false"
    chapterMenu="petcare"
    chapterTitle="Pet Care"
    chapterDesc="Care for your pets"
  >
    <ul>
      <li>
          <page-index-title>Remote Monitoring</page-index-title>
          <page-index-desc>
            Remotely monitor your pet and record any<br />
            motions automatically
          </page-index-desc>
      </li>

      <li>
          <page-index-title>Relaxing Music &amp;TV</page-index-title>
          <page-index-desc>
            Care for your pets while you are away
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
