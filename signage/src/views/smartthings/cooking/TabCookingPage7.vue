<template>
  <div>
    <page-img>
      <img src="/images/smartthings/tab-img-cooking5.png" alt="" />
    </page-img>
    <view-popup :popup="popup">
      <img src="/images/smartthings/tab-img-cooking-time-view.png" alt="" />
    </view-popup>
    <touch-hands
      v-if="touchHands"
      :x="335"
      :y="175"
      type="cooking"
      @click="touchFunc"
    />
    <message-box
      :msg="msg"
      :close="close"
    />
    <message-header title="ME-FIT cooking" />
  </div>
</template>

<script>
import { onUnmounted, ref } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import { vw } from '@/styles/mixin';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import { useRouter } from 'vue-router';
import styled from 'vue3-styled-components';
import Timeout from '@/composables/Timeout';

const ViewPopup = styled(PageImg, { popup: Boolean })`
  img {
    ${vw('height', 200)};
    position: absolute;
    ${vw('top', 50)};
    ${vw('left', 360)};
    opacity: 0;
    transition: 1s;
    ${({ popup }) => popup && 'opacity: 1'};
  }
`;

export default {
  components: { PageImg, TouchHands, MessageBox, ViewPopup },
  setup() {
    const router = useRouter();
    const touchHands = ref(false);
    const msg = ref('Monitor the entire cooking process<br />at a glance from anywhere');
    const close = ref(false);
    const popup = ref(false);
    const { setTimer, clearTimer } = Timeout();

    setTimer(setTimeout(() => {
      popup.value = true;

      setTimer(setTimeout(() => {
        touchHands.value = true;
      }, 500));
    }, 1000));

    const touchFunc = () => {
      close.value = true;
      touchHands.value = false;
      router.push({ name: 'TabCookingPage8' });
      clearTimer();
    };

    onUnmounted(() => {
      clearTimer();
    });

    return {
      touchHands,
      msg,
      close,
      popup,
      touchFunc,
    };
  },
};
</script>
