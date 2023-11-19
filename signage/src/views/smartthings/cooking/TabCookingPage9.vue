<template>
  <div>
    <page-img>
      <img src="/images/smartthings/tab-img-cooking5.png" alt="" />
    </page-img>
    <touch-hands
      v-if="touchHands"
      :x="458"
      :y="120"
      type="cooking"
      @click="touchFunc"
    />
    <message-box
      :msg="msg"
      :close="close"
    />
    <alert-dialog-item :msg="msgRef" :close="alertClose" v-if="showAlertDialog"/>
  </div>
</template>

<script>
import { onUnmounted, ref } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import socket from '@/api/socket';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import AlertDialogItem from '@stComponents/AlertDialogItem.vue';
import { useRouter } from 'vue-router';
import Timeout from '@/composables/Timeout';

export default {
  components: { PageImg, TouchHands, MessageBox, AlertDialogItem },
  setup() {
    const router = useRouter();
    const touchHands = ref(false);
    const msg = ref('Interactive collaboration among kitchen products<br />creates a safe and pleasant cooking process');
    const showAlertDialog = ref(false);
    const msgRef = ref('The kitchen air quality is bad. Turn on the hood?');
    const close = ref(false);
    const alertClose = ref(false);
    const { setTimer, clearTimer } = Timeout();

    setTimer(setTimeout(() => {
      showAlertDialog.value = true;
      setTimer(setTimeout(() => {
        touchHands.value = true;
      }, 500));
    }, 1000));

    const touchFunc = () => {
      alertClose.value = true;
      touchHands.value = false;
      socket.emit('playCookingVideo4');

      setTimer(setTimeout(() => {
        router.push({ name: 'TabCookingPage10' });
      }, 7000));
    };

    onUnmounted(() => {
      clearTimer();
    });

    return {
      touchHands,
      msg,
      close,
      touchFunc,
      msgRef,
      showAlertDialog,
      alertClose,
    };
  },
};
</script>
