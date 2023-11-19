<template>
  <div>
    <page-side-item type='cooking'/>

    <page-img>
      <img src="/images/smartthings/tab-img-cooking7.png" alt="" />
    </page-img>

    <touch-hands
      v-if="touchHands"
      :touchShow="touchShow"
      :x="x"
      :y="y"
      :toolTipX="msgX"
      :toolTipY="msgY"
      :toolTipWidth="485"
      :toolTipMsg="touchMsg"
      :isShow="true"
      :videoToolTip="true"
      vertical='bottom'
      horizontal='right'
      type="cooking"
      @click="touchFunc"
    />

    <message-box
      v-if="showMsg"
      :msg="msg"
      :close="close"
    />

    <next-button
      v-if="showNextButton"
      type="cooking"
      @click="movePage"
      :toolTipX="0"
      :toolTipY="90"
      :toolTipWidth="210"
      toolTipMsg='Finish the experience.'
      :isShow="true"
      vertical='bottom'
      horizontal='right'
    />

    <page-dimmed
      :x="110"
      :y="110"
      :width="dimmedWidth"
      :height="172"
      :radius="30"
      :isShow="isShow"
    />

    <message-header title="Guided cooking" />

    <view-popup :popup="popup">
      <img src="/images/smartthings/tab-img-cooking-smart-popup2.png" alt="" />
    </view-popup>
  </div>
</template>

<script>
import { onUnmounted, ref, reactive, toRefs } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import { useRouter, useRoute } from 'vue-router';
import NextButton from '@stComponents/NextButton.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import Timeout from '@/composables/Timeout';
import PlayedVideo from '@/composables/PlayedVideo';

const ViewPopup = styled('div', { popup: Boolean })`
  position: absolute;
  ${vw('top', 110)};
  ${vw('left', 110)};
  ${vw('width', 500)};
  opacity: 0;
  transition: 1s;
  ${({ popup }) => popup && 'opacity: 1'};
  > img {
    width: 100%;
  }
`;

export default {
  components: { MessageHeader, PageImg, TouchHands, MessageBox, NextButton, PageDimmed, PageSideItem, ViewPopup },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const touchHands = ref(false);
    const msg = ref('Connect dishwasher course for easy clean up');
    const close = ref(false);
    const popup = ref(false);
    const msgRef = ref('If you’ve cooked Beef Tenderloin Steak, try using the<br />dishwasher’s intensive cycle.');
    const touchMsg = ref('Prepare your connected dishwasher for easy clean up.');
    const isShow = ref(true);
    const showMsg = ref(false);
    const showNextButton = ref(false);
    const touchShow = ref(true);
    const { setTimer, clearTimer } = Timeout();
    const { setPlayed, playVideo } = PlayedVideo();

    const dimmedWidth = ref(500);
    const touchPosition = reactive({
      x: 458,
      y: 145 + 80,
      msgX: -186,
      msgY: 90,
    });

    const touchFunc = () => {
      touchShow.value = false;

      setTimer(setTimeout(() => {
        playVideo('playCookingVideo8');
        setPlayed(true);
      }, 1500));

      setTimer(setTimeout(() => {
        close.value = true;
        touchHands.value = false;
        popup.value = false;
        dimmedWidth.value = 0;

        isShow.value = true;
        showNextButton.value = true;

        setTimer(setTimeout(() => {
          touchPosition.x = 350;
          touchPosition.y = 0;
          touchPosition.msgX = 0;
          touchPosition.msgY = 90;
        }, 1000));
      }, 7000));
    };

    setTimer(setTimeout(() => {
      popup.value = true;
      setTimer(setTimeout(() => {
        touchHands.value = true;
      }, 500));
    }, 1000));

    const movePage = () => {
      if (route.query.sc === 'y') {
        router.push({ name: 'TabCookingPage11', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabCookingPage11' });
      }
    };

    onUnmounted(() => {
      clearTimer();
    });

    return {
      touchHands,
      msg,
      close,
      touchFunc,
      movePage,
      popup,
      msgRef,
      isShow,
      touchMsg,
      ...toRefs(touchPosition),
      dimmedWidth,
      showMsg,
      showNextButton,
      touchShow,
    };
  },
};
</script>
