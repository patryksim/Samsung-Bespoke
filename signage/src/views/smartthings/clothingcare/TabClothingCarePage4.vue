<template>
  <div>
    <living-ani-img :livingAni="livingAni">
      <img src="/images/smartthings/tab-img-clothing-care4.png" alt="" />
    </living-ani-img>
    <touch-hands
      v-if="showTouchHands"
      :x="x"
      :y="y"
      :msgX="msgX"
      :msgY="msgY"
      :msgWidth="300"
      :msg="touchMsg"
      :right="true"
      :touchMsg="true"
      type="clothingcare"
      @click="touchHand"
    />
    <message-box
      v-if="showMessageBox"
      :msg="msg"
      :close="close"
      :delay='0'
    />
    <next-button
      v-if="showNextButton"
      type="clothingcare"
      @click="movePage"
    />
    <message-header :title="msgTitle" :subTitle="msgSubTitle" />
  </div>
</template>

<script>
import { reactive, ref, onMounted, toRefs } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import styled from 'vue3-styled-components';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import NextButton from '@stComponents/NextButton.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';

const LivingAniImg = styled(PageImg, { livingAni: Boolean })`
  img {
    opacity: 0;
    transition: opacity 0.5s;
    ${({ livingAni }) => livingAni && 'opacity: 1;'};
  }
`;

export default {
  components: { LivingAniImg, TouchHands, MessageBox, NextButton, MessageHeader },
  setup() {
    const showTouchHands = ref(false);
    const showNextButton = ref(false);
    const router = useRouter();
    const route = useRoute();
    const livingAni = ref(true);
    const close = ref(false);
    const showMessageBox = ref(true);
    const msg = ref('Send your custom cycle from your mobile<br />to your clothing appliances');
    const touchMsg = ref('Free yourself from worrying about electric bills<br />with SmartThings energy');
    const touchPosition = reactive({
      x: 335,
      y: 975,
      msgX: -150,
      msgY: -230,
    });

    const msgTitle = ref('Customized Clothing Care');
    const msgSubTitle = ref('One click setting');

    const touchHand = () => {
      close.value = true;
      if (route.query.sc === 'y') {
        router.push({ name: 'TabClothingCarePage5', query: { sc: 'y' } });
      }
    };

    onMounted(() => {
      setTimeout(() => {
        showTouchHands.value = true;
      }, 1500);
    });

    return {
      close,
      msg,
      showMessageBox,
      showTouchHands,
      showNextButton,
      touchHand,
      livingAni,
      ...toRefs(touchPosition),
      touchMsg,
      msgTitle,
      msgSubTitle,
    };
  },
};
</script>
