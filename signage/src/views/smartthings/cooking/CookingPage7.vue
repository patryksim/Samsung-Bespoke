<template>
  <div>
    <signage-page
      v-if="!videoStart"
      src="/images/smartthings/cooking-1.png"
      header="SmartThings Cooking"
      footer="ME-FIT cooking"
    ></signage-page>
    <signage-page
      v-else
      header="SmartThings Cooking"
      footer="ME-FIT cooking"
      videoSrc="/videos/Cooking4.mp4"
      :autoplay="false"
      :play="true"
    ></signage-page>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue';
import socket from '@/api/socket';
import SignagePage from '@/components/smartthings/SignagePage.vue';

export default {
  components: { SignagePage },
  setup() {
    const videoStart = ref(false);

    socket.on('playCookingVideo4', () => {
      videoStart.value = true;
      nextTick(() => {
        document.querySelector('video').pause(false);
        document.querySelector('video').load();
        document.querySelector('video').play();
      });
    });

    return {
      videoStart,
    };
  },
};
</script>
