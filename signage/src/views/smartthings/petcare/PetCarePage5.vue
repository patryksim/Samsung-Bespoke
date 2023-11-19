<template>
  <signage-page
    header="SmartThings Pet Care"
    :footer="footerRef"
    :videoSrc="videoSrcRef"
    :autoplay="autoplay"
    :muted="muted"
  >
  </signage-page>
</template>

<script>
import { ref } from 'vue';
import SignagePage from '@/components/smartthings/SignagePage.vue';
import socket from '@/api/socket';

export default {
  components: { SignagePage },
  setup() {
    // 임시로 loop 안되게 처리
    const autoplay = ref(false);
    const footerRef = ref('Relaxing music & TV');
    const videoSrcRef = ref('/videos/Pet_TV.mp4');
    const muted = ref(true);
    setTimeout(() => {
      autoplay.value = false;
    }, 2000);

    socket.on('turnOnTV', () => {
      footerRef.value = 'Let your mate watch<br />what we watch';
      videoSrcRef.value = '/videos/Pet_TV.mp4';
      document.querySelector('video').load();
      document.querySelector('video').play();
    });

    socket.on('musicPlay', () => {
      footerRef.value = 'Relaxing musics<br />to help them chill out';
      videoSrcRef.value = '/videos/Pet_sing.mp4';
      document.querySelector('video').pause(false);
      document.querySelector('video').load();

      try {
        document.querySelector('video').play();
      } catch (err) {
        console.log(err);
      }

      muted.value = false;
    });

    return {
      autoplay,
      footerRef,
      videoSrcRef,
      muted,
    };
  },
};
</script>
