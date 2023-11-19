<template>
  <signage-page
    header="SmartThings Cooking"
    footer="ME-FIT cooking"
    videoSrc="/videos/Cooking3.mp4"
    :autoplay="false"
    :play="true"
  >
  </signage-page>
</template>

<script>
import SignagePage from '@/components/smartthings/SignagePage.vue';
import socket from '@/api/socket';

export default {
  components: { SignagePage },
  setup() {
    socket.on('playCookingVideo3', () => {
      document.querySelector('video').pause(false);
      document.querySelector('video').load();
      document.querySelector('video').play();
    });
  },
};
</script>
