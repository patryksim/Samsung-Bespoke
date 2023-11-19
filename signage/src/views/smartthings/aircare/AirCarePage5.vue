<template>
  <signage-page
    header="SmartThings Air Care"
    footer="Make home fresher"
    :videoSrc="videoSrcRef"
    :autoplay="false"
    :fullScreen="true"
  >
  </signage-page>
</template>

<script>
import { onMounted, ref } from 'vue';
import SignagePage from '@/components/smartthings/SignagePage.vue';

export default {
  components: { SignagePage },
  setup() {
    const videoSrcRef = ref('/videos/aircare2.mp4');

    onMounted(() => {
      document.querySelector('video').pause(false);
      document.querySelector('video').load();
      document.querySelector('video').play();
    });

    return {
      videoSrcRef,
    };
  },
};
</script>
