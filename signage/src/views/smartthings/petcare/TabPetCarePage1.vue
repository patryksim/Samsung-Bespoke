<template>
  <div>
    <page-img>
      <img src="/images/smartthings/tab-pet-care-1.png" alt="" />
    </page-img>
    <touch-hands
      v-if="touchHands"
      :x="538"
      :y="338"
      type="petcare"
      @click="messageClose"
    />
    <message-box
      :msg="msg"
      :close="close"
    />
    <next-button
      v-if="showNextButton"
      type="petcare"
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
    const showNextButton = ref(false);
    const msg = ref('Take care of your pets<br />when you are out so you can feel safe');

    const messageClose = () => {
      close.value = true;
      touchHands.value = false;

      if (route.query.sc === 'y') {
        showNextButton.value = true;
      } else {
        router.push({ name: 'TabPetCarePage2' });
      }
    };

    const movePage = () => {
      router.push({ name: 'TabPetCarePage6', query: { sc: 'y' } });
    };

    onMounted(() => {
      setTimeout(() => {
        touchHands.value = true;
      }, 1500);
    });

    return {
      touchHands,
      messageClose,
      msg,
      close,
      showNextButton,
      movePage,
    };
  },
};
</script>
