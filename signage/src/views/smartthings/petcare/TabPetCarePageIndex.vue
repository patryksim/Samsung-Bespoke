<template>
  <page-index-vue
    chapterMenu="petcare"
    chapterTitle="Pet Care"
    chapterDesc="Care for your pets"
  >
    <ul>
      <li @click="movePage('TabPetCarePage2',0,{sc:'y'})">
          <page-index-title>Remote Monitoring</page-index-title>
          <page-index-desc>
            Remotely monitor your pet and record any<br />
            motions automatically
          </page-index-desc>
      </li>

      <li @click="movePage('TabPetCarePage4',0,{sc:'y'})">
          <page-index-title>Relaxing Music &amp;TV</page-index-title>
          <page-index-desc>
            Care for your pets while you are away
          </page-index-desc>
      </li>
    </ul>
  </page-index-vue>
</template>

<script>
import movePage from '@/composables/movePage';
import PageIndexVue, { PageIndexTitle, PageIndexDesc } from '@/components/smartthings/PageIndex.vue';

export default {
  components: {
    PageIndexVue,
    PageIndexTitle,
    PageIndexDesc,
  },
  setup() {
    return {
      movePage,
    };
  },
};
</script>
