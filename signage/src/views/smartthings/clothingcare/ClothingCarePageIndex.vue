<template>
  <page-index-vue
    :is-tablet="false"
    chapterMenu="clothingcare"
    chapterTitle="Clothing Care"
    chapterDesc="Keep your clothes pristine"
  >
    <ul>
      <li>
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
import PageIndexVue, { PageIndexTitle, PageIndexDesc } from '@/components/smartthings/PageIndex.vue';

export default {
  components: {
    PageIndexVue,
    PageIndexTitle,
    PageIndexDesc,
  },
};
</script>
