<template>
  <signage-page
    header="SmartThings Cooking"
    footer="Cook inspiration"
    videoSrc="/videos/Cooking_2.mp4"
    :autoplay="false"
    :fullScreen="true"
    :play="true"
  >
  </signage-page>
</template>

<script>
import SignagePage from '@/components/smartthings/SignagePage.vue';

export default {
  components: { SignagePage },
  setup() {
  },
};
</script>
