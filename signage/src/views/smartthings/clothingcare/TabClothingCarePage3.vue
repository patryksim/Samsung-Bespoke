<template>
  <wrapper>
    <page-side-item type='clothingcare'/>

    <living-ani-img :livingAni="livingAni">
      <img :src="afterImg ? '/images/smartthings/tab-img-clothing-care3.png' : '/images/smartthings/tab-img-clothing-care4.png'" alt="" />
    </living-ani-img>

    <page-dimmed
      class="top"
      :isShow="showComplateCycleTouch"
      v-bind="complateCycleDimmed"
    />

    <touch-hands
      v-if="showComplateCycleTouch"
      v-bind="complateCycleTouch"
      type="clothingcare"
    />

    <message-box
      v-if="showMessageBox"
      :msg="msg"
      :close="close"
      imgSrc="/images/smartthings/tab-clothingcare-msgbox-tip.png"
      :delay='0'
    />

    <page-dimmed
      :isShow="showStartCycleTouch"
      v-bind="startCycleDimmed"
    />

    <touch-hands
      v-if="showStartCycleTouch"
      v-bind="startCycleTouch"
      :touchShow="touchShow"
      type="clothingcare"
    />

    <next-button
      v-if="showNextButton"
      type="clothingcare"
      @click="movePage"
    />
    <message-header :title="msgTitle" :subTitle="msgSubTitle" />
  </wrapper>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import styled from 'vue3-styled-components';
import PageSideItem from '@stComponents/PageSideItem.vue';
import { PageImg } from '@/styles/smartthings/common';
import PageDimmed from '@stComponents/PageDimmed.vue';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import NextButton from '@stComponents/NextButton.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import Timeout from '@/composables/Timeout';
import PlayedVideo from '@/composables/PlayedVideo';

const Wrapper = styled.div`background-color: #d6f0e6;`;

const LivingAniImg = styled(PageImg, { livingAni: Boolean })`
  img {
    opacity: 0;
    transition: opacity 0.5s;
    ${({ livingAni }) => livingAni && 'opacity: 1;'};
  }
`;

export default {
  components: { Wrapper, PageSideItem, LivingAniImg, PageDimmed, TouchHands, MessageBox, NextButton, MessageHeader },
  setup() {
    const showNextButton = ref(false);
    const router = useRouter();
    const route = useRoute();
    const livingAni = ref(true);
    const afterImg = ref(true);
    const touchShow = ref(true);
    const next = ref(false);
    const close = ref(true);
    const showMessageBox = ref(false);
    const msg = ref('Send your custom cycle from your mobile<br />to your clothing appliances.');
    const touchMsg = ref('Free yourself from worrying about electric bills<br />with SmartThings energy');
    const play = ref(false);
    const { setTimer, clearTimer } = Timeout();
    const { setPlayed, playVideo } = PlayedVideo();

    const movePage = () => {
      router.push({ name: 'TabClothingCarePage6', query: { sc: 'y' } });
    };

    const msgTitle = ref('Customized Clothing Care');
    const msgSubTitle = ref('Custom cycle');

    const showComplateCycleTouch = ref(false);
    const showStartCycleTouch = ref(false);

    const clickHandlerForComplateCycle = () => {
      showComplateCycleTouch.value = false;
      showMessageBox.value = true;
      afterImg.value = false;
      msgSubTitle.value = 'One click setting';
      close.value = false;

      setTimer(setTimeout(() => {
        close.value = true;
        showStartCycleTouch.value = true;
      }, 5000));
    };

    const complateCycleDimmed = {
      x: 145,
      y: 115,
      width: 430,
      height: 312,
      radiusGroup: [37, 37, 0, 0],
    };

    const complateCycleTouch = {
      x: 340,
      y: 248,
      touchMsg: true,
      isShow: true,
      toolTipX: -304,
      toolTipY: 90,
      toolTipWidth: 400,
      toolTipMsg: 'Complete Custom cycle for your golf wears.',
      horizontal: 'right',
      vertical: 'bottom',
      onClick: clickHandlerForComplateCycle,
    };

    const clickHandlerForStartCycle = () => {
      touchShow.value = false;
      if (!play.value) {
        setTimer(setTimeout(() => {
          playVideo('playClothingCareVideo');
          setPlayed(true);
        }, 1500));

        setTimer(setTimeout(() => {
          showStartCycleTouch.value = false;

          if (route.query.sc === 'y') {
            router.push({ name: 'TabClothingCarePage5', query: { sc: 'y' } });
          } else {
            router.push({ name: 'TabClothingCarePage5' });
          }
        }, 11500));

        play.value = true;
      }
    };

    const startCycleDimmed = {
      x: 257,
      y: 972,
      width: 206,
      height: 51.76,
      radius: 52,
    };

    const startCycleTouch = {
      x: 335,
      y: 975,
      touchMsg: true,
      isShow: true,
      toolTipX: -309,
      toolTipY: 100,
      toolTipPointY: 90,
      toolTipWidth: 350,
      toolTipMsg: 'Start customized cycle with one touch.',
      videoToolTip: true,
      videoToolTipMsg: 'Watch the screen',
      vertical: 'top',
      horizontal: 'right',
      onClick: clickHandlerForStartCycle,
    };

    onMounted(() => {
      setTimer(setTimeout(() => {
        showComplateCycleTouch.value = true;
      }, 1000));
    });

    onUnmounted(() => {
      clearTimer();
    });

    return {
      next,
      close,
      msg,
      showMessageBox,
      showNextButton,
      livingAni,
      afterImg,
      touchMsg,
      movePage,
      msgTitle,
      msgSubTitle,
      touchShow,
      showComplateCycleTouch,
      complateCycleDimmed,
      complateCycleTouch,
      showStartCycleTouch,
      startCycleDimmed,
      startCycleTouch,
    };
  },
};
</script>
