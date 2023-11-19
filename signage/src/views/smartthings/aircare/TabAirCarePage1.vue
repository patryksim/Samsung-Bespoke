<template>
  <page-wrapper>
    <page-img>
      <img src="/images/smartthings/tab-img-air-care1.png" alt="" />
    </page-img>

    <touch-hands
      v-if="showTouchHands"
      :x="450"
      :y="338"
      type="aircare"
      @click="messageClose"
    />

    <message-box
      :msg="msg"
      :close="close"
    />

    <next-button
      v-if="showNextButton"
      type="aircare"
      @click="movePage"
    />
  </page-wrapper>
</template>

<script>
import { ref, onMounted } from 'vue';
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import NextButton from '@stComponents/NextButton.vue';

export default {
  components: { PageWrapper, PageImg, TouchHands, MessageBox, NextButton },
  setup() {
    const close = ref(false);
    const showTouchHands = ref(false);
    const showNextButton = ref(false);
    const router = useRouter();
    const route = useRoute();
    const msg = ref('Ensure the air quality in your house stays<br />fresh and pleasant');

    const messageClose = () => {
      close.value = true;
      showTouchHands.value = false;

      if (route.query.sc === 'y') {
        showNextButton.value = true;
      } else {
        router.push({ name: 'TabAirCarePage2' });
      }
    };

    const movePage = () => {
      if (showNextButton.value === true) {
        router.push({ name: 'TabAirCarePage6', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabAirCarePage6' });
      }
    };

    onMounted(() => {
      setTimeout(() => {
        showTouchHands.value = true;
      }, 1500);
    });

    return {
      messageClose,
      movePage,
      showTouchHands,
      showNextButton,
      msg,
      close,
    };
  },
};
</script>
