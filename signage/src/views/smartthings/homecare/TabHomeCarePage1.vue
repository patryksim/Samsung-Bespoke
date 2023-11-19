<template>
  <div>
    <page-img>
      <img src="/images/smartthings/tab-img-home-care1.png" alt="" />
    </page-img>
    <touch-hands
      v-if="showTouchHands"
      :x="535"
      :y="335"
      type="homecare"
      @click="messageClose"
    />
    <message-box
      :msg="msg"
      :close="close"
    />
    <next-button
      v-if="showNextButton"
      type="homecare"
      @click="movePage"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import NextButton from '@stComponents/NextButton.vue';

export default {
  components: { PageImg, TouchHands, MessageBox, NextButton },
  setup() {
    const close = ref(false);
    const router = useRouter();
    const route = useRoute();
    const showTouchHands = ref(false);
    const showNextButton = ref(false);
    const msg = ref('SmartThings Home Care is always monitoring<br />your device.');

    const messageClose = () => {
      close.value = true;
      showTouchHands.value = false;

      if (route.query.sc === 'y') {
        showNextButton.value = true;
      } else {
        router.push({ name: 'TabHomeCarePage2' });
      }
    };

    const movePage = () => {
      router.push({ name: 'TabHomeCarePage6', query: { sc: 'y' } });
    };

    onMounted(() => {
      setTimeout(() => {
        showTouchHands.value = true;
      }, 1500);
    });

    return {
      showTouchHands,
      showNextButton,
      messageClose,
      close,
      msg,
      movePage,
    };
  },
};
</script>
