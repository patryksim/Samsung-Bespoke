<template>
  <div>
    <message-header title="Cook inspiration" subTitle="" />
    <page-side-item type="cooking"/>
    <scroll-image :scrollImg="scrollImg">
      <img src="/images/smartthings/tab-img-cooking8.png" alt="" />
    </scroll-image>
    <page-dimmed
      :x="dimmedX"
      :y="dimmedY"
      :width="dimmedWidth"
      :height="dimmedHeight"
      :radius="dimmedRadius"
      :isShow="isDimmedShow"
    />
    <touch-hands
      v-if="touchHands"
      :touchShow="touchShow"
      :x="x"
      :y="y"
      :toolTipX="msgX"
      :toolTipY="msgY"
      :toolTipWidth="msgWidth"
      :toolTipMsg="touchMsg"
      :isShow="true"
      :videoToolTip="videoToolTip"
      :videoToolTipMsg="videoToolTipMsg"
      :vertical="vertical"
      horizontal='right'
      type="cooking"
      @click="touchHandsFunc"
    />
    <message-box
      :msg="msg"
      :close="close"
      imgSrc="/images/smartthings/tab-cooking-msgbox-tip.png"
    />
    <next-button
      v-if="showNextButton"
      type="cooking"
      :toolTipWidth="210"
      :toolTipMsg="touchMsg"
      :isShow="true"
      @click="movePage"
    />
  </div>
</template>

<script>
import { onMounted, ref, reactive, toRefs, onUnmounted } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import TouchHands from '@stComponents/TouchHands.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import NextButton from '@stComponents/NextButton.vue';
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import { useRouter, useRoute } from 'vue-router';
import Timeout from '@/composables/Timeout';
import PlayedVideo from '@/composables/PlayedVideo';

const ScrollImage = styled(PageImg, { scrollImg: Boolean })`
  font-size: 0;

  > img:nth-child(1) {
    width: 100%;
    height: 100%;
    transition:margin-top 3.5s;
    ${({ scrollImg }) => scrollImg && vw('margin-top', -1500)};
  }
`;

export default {
  components: { ScrollImage, TouchHands, PageDimmed, PageSideItem, MessageBox, MessageHeader, NextButton },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const touchShow = ref(true);
    const isDimmedShow = ref(true);
    const close = ref(false);
    const touchHands = ref(false);
    const videoToolTip = ref(true);
    const scrollImg = ref(false);
    const showNextButton = ref(false);

    const touchMsg = ref('Check your fridge and order what you need.');
    const msg = ref('Check required ingredients<br />and purchase everything you need');
    const videoToolTipMsg = ref('Watch the screen');

    const stepIdx = ref(0);

    const touchPosition = reactive({
      x: 338,
      y: 900,
      vertical: 'top',
      msgX: -305,
      msgY: 90,
      msgWidth: 400,
    });

    const dimmedPosition = reactive({
      dimmedX: 209,
      dimmedY: 895,
      dimmedWidth: 298,
      dimmedHeight: 51,
      dimmedRadius: 25,
    });

    const { setTimer, clearTimer } = Timeout();
    const { getPlayed, setPlayed, playVideo } = PlayedVideo();

    onMounted(() => {
      setTimer(setTimeout(() => {
        touchHands.value = true;
      }, 1500));
    });

    const touchHandsFunc = () => {
      if (stepIdx.value === 0) {
        touchShow.value = false;

        if (getPlayed() === false) {
          setTimer(setTimeout(() => {
            playVideo('playCookingVideo6');
            setPlayed(true);
          }, 1500));
        }

        setTimer(setTimeout(() => {
          if (getPlayed() === true) {
            setPlayed(false);
            close.value = true;
            touchHands.value = false;
            isDimmedShow.value = false;
            dimmedPosition.dimmedWidth = 0;

            touchHands.value = true;
            isDimmedShow.value = true;
            videoToolTip.value = false;
            touchShow.value = true;
            touchMsg.value = 'Follow step-by-step recipes for easy cooking.';
            touchPosition.msgWidth = 410;
            touchPosition.y = 410;
            dimmedPosition.dimmedX = 230;
            dimmedPosition.dimmedY = 405;
            dimmedPosition.dimmedWidth = 260;
            dimmedPosition.dimmedHeight = 52;
            touchPosition.vertical = 'bottom';

            stepIdx.value = 1;
          }
        }, 8500));
      } else if (stepIdx.value === 1) {
        close.value = true;
        isDimmedShow.value = false;
        touchHands.value = false;

        if (!scrollImg.value) {
          setTimer(setTimeout(() => {
            scrollImg.value = true;
          }, 1500));
        }

        setTimer(setTimeout(() => {
          isDimmedShow.value = true;
          touchHands.value = true;
          videoToolTip.value = true;
          touchMsg.value = 'Send the recipe to your oven.';
          videoToolTipMsg.value = 'Watch video on the screen';
          touchPosition.y = 710;
          touchPosition.msgX = -306;
          touchPosition.msgWidth = 300;
          dimmedPosition.dimmedWidth = 456;
          dimmedPosition.dimmedHeight = 74;
          dimmedPosition.dimmedX = 130;
          dimmedPosition.dimmedY = 708;
          dimmedPosition.dimmedRadius = 52;
        }, 5500));

        stepIdx.value = 2;
      } else if (stepIdx.value === 2) {
        touchShow.value = false;

        setTimer(setTimeout(() => {
          playVideo('playCookingVideo7');
          setPlayed(true);
        }, 1500));

        setTimer(setTimeout(() => {
          touchHands.value = false;
          isDimmedShow.value = false;

          dimmedPosition.dimmedWidth = 0;
          showNextButton.value = true;
          isDimmedShow.value = true;
          touchMsg.value = 'Finish the experience.';
        }, 8500));

        if (route.query.sc !== 'y') {
          router.push({ name: 'TabCookingPage5' });
        }
      }
    };

    const movePage = () => {
      router.push({ name: 'TabCookingPage11', query: { sc: 'y' } });
    };

    onUnmounted(() => {
      clearTimer();
    });

    return {
      touchShow,
      touchMsg,
      touchHands,
      close,
      touchHandsFunc,
      ...toRefs(touchPosition),
      ...toRefs(dimmedPosition),
      isDimmedShow,
      msg,
      videoToolTip,
      scrollImg,
      showNextButton,
      movePage,
      videoToolTipMsg,
    };
  },
};
</script>
