<template>
  <div>
    <page-img>
      <img src="/images/smartthings/tab-img-cooking1.png" alt="" />
    </page-img>
    <touch-hands
      v-if="touchHands"
      :x="538"
      :y="338"
      :toolTipX="-66"
      :toolTipY="90"
      :toolTipWidth="450"
      :toolTipMsg="touchMsg"
      :isShow="false"
      vertical='bottom'
      horizontal='right'
      type="cooking"
      @click="pageMove"
    />
    <message-box
      :msg="msg"
      :close="close"
    />
    <next-button
      v-if="showNextButton"
      type="cooking"
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
    const touchHands = ref(false);
    const msg = ref('An ideal, seemless kitchen experience with<br />precise and convenient assitance');
    const touchMsg = ref('An ideal, seemless kitchen experience with<br />precise and convenient assitance');
    const showNextButton = ref(false);

    onMounted(() => {
      setTimeout(() => {
        touchHands.value = true;
      }, 1500);
    });

    const pageMove = () => {
      close.value = true;
      touchHands.value = false;

      if (route.query.sc === 'y') {
        showNextButton.value = true;
      } else {
        router.push({ name: 'TabCookingPage2' });
      }
    };

    const movePage = () => {
      router.push({ name: 'TabCookingPage11', query: { sc: 'y' } });
    };

    return {
      touchMsg,
      pageMove,
      touchHands,
      msg,
      close,
      showNextButton,
      movePage,
    };
  },
};
</script>
