<template>
  <signage-page
    header="SmartThings Pet Care"
    footer="Record your Pet’s daily life"
    :videoSrc="videoSrcRef"
    :autoplay="false"
  >
  </signage-page>
</template>

<script>
import SignagePage from '@/components/smartthings/SignagePage.vue';
import socket from '@/api/socket';
import { ref } from 'vue';

export default {
  components: { SignagePage },
  setup() {
    const videoSrcRef = ref('/videos/Pet4.mp4');

    socket.on('playVideo', () => {
      document.getElementsByTagName('video')[0].play();
      setTimeout(() => {
        document.querySelector('video').pause();
        videoSrcRef.value = '/videos/Pet1.mp4';
        document.getElementsByTagName('video')[0].load();
        document.getElementsByTagName('video')[0].play();
      }, 1000);
    });

    return {
      videoSrcRef,
    };
  },
};
</script>
