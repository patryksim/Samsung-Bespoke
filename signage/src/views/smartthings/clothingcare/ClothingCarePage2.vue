<template>
  <signage-page
    src="/images/smartthings/clothingcare-1.jpg"
    header="SmartThings Clothing Care"
    footer="Customized clothing care"
    :videoSrc="videoSrc"
    :autoplay="false"
    :fullScreen="true"
    :play="play"
  >
  </signage-page>
</template>

<script>
import SignagePage from '@/components/smartthings/SignagePage.vue';
import { onUnmounted, ref } from 'vue';
import socket from '@/api/socket';
import Timeout from '@/composables/Timeout';

export default {
  components: { SignagePage },
  setup() {
    const videoSrc = ref('/videos/Clothing.mp4');
    const play = ref(false);
    const { setTimer, clearTimer } = Timeout();

    socket.on('playClothingCareVideo', () => {
      document.querySelector('video').pause(false);
      document.querySelector('video').load();
      setTimer(setTimeout(() => {
        play.value = true;
        document.querySelector('video').play();
      }, 150));
    });

    onUnmounted(() => {
      clearTimer();
    });

    return {
      play,
      videoSrc,
    };
  },
};
</script>
