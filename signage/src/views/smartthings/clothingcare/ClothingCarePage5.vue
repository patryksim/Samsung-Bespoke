<template>
  <signage-page
    header="SmartThings Clothing Care"
    footer="Customized clothing care"
    videoSrc="/videos/Clothing.mp4"
    :autoplay="false"
    :fullScreen="true"
  >
  </signage-page>
</template>

<script>
import SignagePage from '@/components/smartthings/SignagePage.vue';
import { onMounted } from 'vue';

export default {
  components: { SignagePage },
  setup() {
    onMounted(() => {
      const video = document.querySelector('video');

      video.pause(false);
      video.load();
      video.play();
    });
  },
};
</script>
