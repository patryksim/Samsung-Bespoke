<template>
  <page-wrapper>
    <page-side-item type='cooking'/>

    <page-img>
      <img src="/images/smartthings/tab-img-cooking9.png" alt="" />
    </page-img>

    <page-dimmed
      :x="230"
      :y="405"
      :width="260"
      :height="52"
      :radius="25"
      :isShow="isShow"
    />

    <touch-hands
      v-if="touchHands"
      :touchShow="touchShow"
      :x="338"
      :y="408"
      :toolTipX="-307"
      :toolTipY="90"
      :toolTipWidth="410"
      :toolTipMsg="touchMsg"
      :isShow="true"
      :videoToolTip="true"
      vertical='bottom'
      horizontal='right'
      type="cooking"
      @click="touchFunc"
    />

    <message-box
      :msg="msg"
      :close="close"
      imgSrc="/images/smartthings/tab-cooking-msgbox-tip.png"
    />

    <message-header title="Guided cooking" />
  </page-wrapper>
</template>

<script>
import { onMounted, ref, onUnmounted } from 'vue';
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import MessageHeader from '@stComponents/MessageHeader.vue';
import TouchHands from '@stComponents/TouchHands.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import socket from '@/api/socket';
import Timeout from '@/composables/Timeout';
import PlayedVideo from '@/composables/PlayedVideo';

export default {
  components: { PageWrapper, PageImg, TouchHands, PageSideItem, PageDimmed, MessageBox, MessageHeader },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const touchHands = ref(false);
    const touchMsg = ref('Follow step-by-step recipes for easy cooking.');
    const msg = ref('SmartThings connects your devices to<br />make your cooking easy and comfort.');
    const isShow = ref(true);
    const close = ref(false);
    const touchShow = ref(true);

    const { setTimer, clearTimer } = Timeout();
    const { setPlayed, playVideo } = PlayedVideo();

    onMounted(() => {
      setTimer(setTimeout(() => {
        touchHands.value = true;
      }, 1500));
      socket.emit('enteredGuidedCooking');
    });

    const touchFunc = () => {
      touchShow.value = false;
      setTimer(setTimeout(() => {
        playVideo('playCookingVideo');
        setPlayed(true);
      }, 1500));

      setTimer(setTimeout(() => {
        isShow.value = false;
        close.value = true;
        touchHands.value = false;

        if (route.query.sc === 'y') {
          router.push({ name: 'TabCookingPage6', query: { sc: 'y' } });
        } else {
          router.push({ name: 'TabCookingPage6' });
        }
      }, 19500));
    };

    onUnmounted(() => {
      clearTimer();
    });

    return {
      touchShow,
      touchHands,
      touchMsg,
      isShow,
      msg,
      close,
      touchFunc,
    };
  },
};
</script>
