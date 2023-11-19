<template>
  <signage-page
    header="SmartThings Cooking"
    :footer="footerRef"
    :videoSrc="videoSrcRef"
    :autoplay="false"
    :fullScreen="fullScreen"
    :play="true"
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
    const videoSrcRef = ref('/videos/Cooking_2.mp4');
    const fullScreen = ref(true);
    const footerRef = ref('Cook inspiration');

    socket.on('enteredGuidedCooking', () => {
      footerRef.value = 'Guided cooking';
      fullScreen.value = false;
      videoSrcRef.value = '/videos/Cooking1.mp4';
      document.querySelector('video').pause(false);
      document.querySelector('video').load();
    });

    socket.on('playCookingVideo', () => {
      setTimeout(() => {
        document.querySelector('video').pause(false);
        document.querySelector('video').play();
      }, 150);

      setTimeout(() => {
        videoSrcRef.value = '/videos/Cooking2.mp4';
        document.querySelector('video').pause(false);
        document.querySelector('video').load();
        setTimeout(() => {
          document.querySelector('video').play();
        }, 150);
      }, 10000);
    });

    socket.on('playCookingVideo2', () => {
      videoSrcRef.value = '/videos/Cooking_4.mp4';
      document.querySelector('video').pause(false);
      document.querySelector('video').load();
      setTimeout(() => {
        document.querySelector('video').play();
      }, 150);
      fullScreen.value = true;
    });

    socket.on('playCookingVideo6', () => {
      videoSrcRef.value = '/videos/Cooking_2.mp4';
      document.querySelector('video').pause(false);
      document.querySelector('video').load();
      setTimeout(() => {
        document.querySelector('video').play();
      }, 150);
    });

    socket.on('playCookingVideo7', () => {
      videoSrcRef.value = '/videos/Cooking_3.mp4';
      document.querySelector('video').pause(false);
      document.querySelector('video').load();
      setTimeout(() => {
        document.querySelector('video').play();
      }, 150);
    });

    socket.on('playCookingVideo8', () => {
      videoSrcRef.value = '/videos/Cooking_5.mp4';
      document.querySelector('video').pause(false);
      document.querySelector('video').load();
      setTimeout(() => {
        document.querySelector('video').play();
      }, 150);
      fullScreen.value = true;
    });

    return {
      videoSrcRef,
      fullScreen,
      footerRef,
    };
  },
};
</script>
