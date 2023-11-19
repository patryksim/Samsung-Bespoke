<template>
  <page-index-vue
    chapterMenu="cooking"
    chapterTitle="Cooking"
    chapterDesc="More Enjoyable Cooking"
  >
    <ul>
      <li @click="movePage('TabCookingPage2',0,{sc:'y'})">
        <page-index-title>Cook inspiration</page-index-title>
        <page-index-desc>
          See what you have in your fridge and get<br />
          recommended recipe
        </page-index-desc>
      </li>

      <li @click="movePage('TabCookingPage5',0,{sc:'y'})">
        <page-index-title>Guided cooking</page-index-title>
        <page-index-desc>
          Enjoy simplified cooking with one-touch temperature<br />
          and time control from the recipe
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
