<template>
  <div>
    <page-side-item type='cooking'/>

    <page-img>
      <img src="/images/smartthings/tab-img-cooking4.png" alt="" />
    </page-img>

    <touch-hands
      v-if="isShow"
      :touchShow="touchShow"
      :x="x"
      :y="y"
      :toolTipX="msgX"
      :toolTipY="msgY"
      :toolTipWidth="400"
      :toolTipMsg="touchMsg"
      :toolTipPointY="209"
      :isShow="true"
      :videoToolTip="true"
      vertical='top'
      horizontal='right'
      type="cooking"
      @click="touchFunc"
    />

    <message-box
      v-if="showMsg"
      :msg="msg"
      :close="close"
      :delay="0"
      imgSrc="/images/smartthings/tab-cooking-msgbox-tip.png"
    />

    <induction-popup :inductionAni="inductionAni">
      <img src="/images/smartthings/tab-img-cooking-send-popup.png" alt="" />
    </induction-popup>

    <page-dimmed
      :x="113"
      :y="936"
      :width="495"
      :height="181"
      :radius="35"
      :isShow="isShow"
    />

    <message-header title="Guided cooking" />
  </div>
</template>

<script>
import { onUnmounted, ref, reactive, toRefs } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import { vw } from '@/styles/mixin';
import styled from 'vue3-styled-components';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import Timeout from '@/composables/Timeout';
import PlayedVideo from '@/composables/PlayedVideo';

const InductionPopup = styled(PageImg, { inductionAni: Boolean })`
  img {
    ${vw('width', 495)};
    ${vw('height', 180)};
    position: absolute;
    ${vw('bottom', -200)};
    ${vw('left', 360)};
    transition: .8s;
    ${({ inductionAni }) => inductionAni && `${vw('bottom', 35)}`};
  }
`;

export default {
  components: { MessageHeader, PageImg, TouchHands, MessageBox, InductionPopup, PageDimmed, PageSideItem },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const showMsg = ref(false);
    const msg = ref('Stay in control with one-touch temperature<br />and time control from the recipe.');
    const close = ref(false);
    const inductionAni = ref(false);
    const isShow = ref(false);
    const touchMsg = ref('Send your recipe to your connected device.');
    const touchShow = ref(true);
    const { setTimer, clearTimer } = Timeout();
    const { setPlayed, playVideo } = PlayedVideo();

    const touchPosition = reactive({
      x: 345,
      y: 1070,
      msgX: -299,
      msgY: 220,
    });

    setTimer(setTimeout(() => {
      setTimer(setTimeout(() => {
        showMsg.value = true;
      }, 3000));

      setTimer(setTimeout(() => {
        close.value = true;
        inductionAni.value = true;
      }, 8000));

      setTimer(setTimeout(() => {
        showMsg.value = false;
        isShow.value = true;
      }, 9000));
    }, 1000));

    const touchFunc = () => {
      touchShow.value = false;

      setTimer(setTimeout(() => {
        playVideo('playCookingVideo2');
        setPlayed(true);
      }, 1500));

      setTimer(setTimeout(() => {
        isShow.value = false;

        if (route.query.sc === 'y') {
          router.push({ name: 'TabCookingPage10', query: { sc: 'y' } });
        } else {
          router.push({ name: 'TabCookingPage10' });
        }
      }, 7500));
    };

    onUnmounted(() => {
      clearTimer();
    });

    return {
      touchShow,
      showMsg,
      msg,
      close,
      inductionAni,
      touchFunc,
      touchMsg,
      isShow,
      ...toRefs(touchPosition),
    };
  },
};
</script>
