<template>
  <div>
    <page-img>
      <img src="/images/smartthings/tab-img-clothing-care1.png" alt="" />
    </page-img>
    <touch-hands
      v-if="showTouchHands"
      :x="535"
      :y="335"
      type="clothingcare"
      @click="messageClose"
    />
    <message-box
      :msg="msg"
      :close="close"
    />
    <next-button
      v-if="showNextButton"
      type="clothingcare"
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
    const showTouchHands = ref(false);
    const showNextButton = ref(false);
    const close = ref(false);
    const router = useRouter();
    const route = useRoute();
    const msg = ref('Optimized clothing care manages washing<br />and drying to fit your circumstances');

    const messageClose = () => {
      close.value = true;
      showTouchHands.value = false;

      if (route.query.sc === 'y') {
        showNextButton.value = true;
      } else {
        router.push({ name: 'TabClothingCarePage2' });
      }
    };

    const movePage = () => {
      router.push({ name: 'TabClothingCarePage6', query: { sc: 'y' } });
    };

    onMounted(() => {
      setTimeout(() => {
        showTouchHands.value = true;
      }, 5000);
    });

    return {
      showTouchHands,
      messageClose,
      close,
      msg,
      showNextButton,
      movePage,
    };
  },
};
</script>
