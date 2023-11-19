<template>
  <page-index-vue
    chapterMenu="clothingcare"
    chapterTitle="Clothing Care"
    chapterDesc="Keep your clothes pristine"
  >
    <ul>
      <li @click="movePage('TabClothingCarePage2',0,{sc:'y'})">
        <page-index-title>Customized clothing care</page-index-title>
        <page-index-desc>
          Keep your clothes pristine by recommended<br />
          washing cycles
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
