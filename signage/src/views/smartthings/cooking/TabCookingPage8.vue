<template>
  <div>
    <page-img>
      <img src="/images/smartthings/tab-img-cooking6.png" alt="" />
      <message-box
        :msg="msg"
        :close="close"
      />
    </page-img>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import { useRouter } from 'vue-router';
import socket from '@/api/socket';
import MessageBox from '@stComponents/MessageBox.vue';
import Timeout from '@/composables/Timeout';

export default {
  components: { PageImg, MessageBox },
  setup() {
    const router = useRouter();
    const msg = ref('Monitor the entire cooking process<br />at a glance from anywhere');
    const close = ref(false);
    const { setTimer, clearTimer } = Timeout();

    setTimer(setTimeout(() => {
      socket.emit('playCookingVideo3');
      setTimer(setTimeout(() => {
        close.value = true;
        router.push({ name: 'TabCookingPage9' });
      }, 5000));
    }, 1000));

    onUnmounted(() => {
      clearTimer();
    });

    return {
      msg,
      close,
    };
  },
};
</script>
