<template>
  <page-wrapper>
    <page-side-item type='petcare'/>
    <scroll-ani-img :scrollAni="scrollAni">
      <img src="/images/smartthings/tab-pet-care-4.png" alt="" />
      <img src="/images/smartthings/tab-pet-care-5.png" alt="" />
    </scroll-ani-img>
    <touch-hands
      v-if="touchHands"
      :x="x"
      :y="y"
      :toolTipX="msgX"
      :toolTipY="msgY"
      :toolTipPointY="pointY"
      :toolTipWidth="width"
      :toolTipMsg="touchMsg"
      :isShow="true"
      :touchShow="touchShow"
      :videoToolTip="true"
      :vertical='vertical'
      :horizontal='horizontal'
      type="petcare"
      @click="touchHandsFunc"
    />
    <message-alert
      imgSrc="/images/smartthings/tab-petcare-msgbox-tip.png"
      :msg="msg"
      :timeout="5000"
      :callback="[showNextMsg, showTouchHands, showTouchHands2]"
      :openTimeout="3500"
    />
    <message-box
      imgSrc="/images/smartthings/tab-petcare-msgbox-tip.png"
      v-if="showMessageBox"
      :msg="msgBox"
      :close="close"
    />
    <next-button
      v-if="showNextButton"
      type="petcare"
      :toolTipX="0"
      :toolTipY="90"
      :toolTipWidth="210"
      :toolTipMsg="touchMsg"
      :isShow="true"
      vertical='top'
      horizontal='right'
      @click="movePage"
    />
    <page-dimmed
      :x="dimmedX"
      :y="dimmedY"
      :width="dimmedWidth"
      :height="dimmedHeight"
      :radius="dimmedRadius"
      :isShow="isShow"
    />
    <message-header :title="msgTitle" :subTitle="msgSubTitle" />
  </page-wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { reactive, ref, toRefs, onUnmounted } from 'vue';
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageAlert from '@stComponents/MessageAlert.vue';
import socket from '@/api/socket';
import MessageBox from '@stComponents/MessageBox.vue';
import NextButton from '@stComponents/NextButton.vue';
import { vw } from '@/styles/mixin';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import Timeout from '@/composables/Timeout';
import PlayedVideo from '@/composables/PlayedVideo';

const ScrollAniImg = styled(PageImg, { scrollAni: Boolean })`
  > img:nth-child(1) {
    transition:margin-top 2s;
    ${({ scrollAni }) => scrollAni && vw('margin-top', -750)};
  }

  > img:nth-child(2) {
    ${vw('margin-top', -405)}
  }
`;

export default {
  components: { PageWrapper, ScrollAniImg, TouchHands, MessageAlert, MessageBox, NextButton, PageDimmed, PageSideItem, MessageHeader },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const touchShow = ref(true);
    const touchHands = ref(false);
    const close = ref(false);
    const showNextButton = ref(false);
    const showMessageBox = ref(false);
    const { setTimer, clearTimer } = Timeout();
    const { getPlayed, setPlayed, playVideo } = PlayedVideo();
    let end = false;

    const msgTitle = ref('Relaxing Music & TV');
    const msgSubTitle = ref('');

    const scrollAni = ref(false);
    const msgBox = ref('Various musics are available too');
    const msg = ref('Comfort your pets, feeling lonely or anxious<br />while being home alone');
    const touchMsg = ref('Turn on the TV to keep your pet calm.');
    const isShow = ref(false);

    const touchPosition = reactive({
      x: 335,
      y: 1000,
      msgX: -310,
      msgY: 90,
      width: 340,
      pointY: 186,
      vertical: 'top',
      horizontal: 'right',
    });

    const dimmedPosition = reactive({
      dimmedX: 118,
      dimmedY: 875,
      dimmedWidth: 480,
      dimmedHeight: 200,
      dimmedRadius: 50,
    });

    const movePage = () => {
      if (route.query.sc === 'y') {
        router.push({ name: 'TabPetCarePage6', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabPetCarePage6' });
      }
    };

    const showNextMsg = () => {
      setTimer(setTimeout(() => {
        socket.emit('TabPetCarePage5');
        touchHands.value = true;
        isShow.value = true;
        msgTitle.value = 'Play TV';
        msgSubTitle.value = 'Video';
        touchPosition.msgY = 200;
      }, 1000));
    };

    const showTouchHands = () => {
      // touchHands.value = true;
      // isShow.value = true;
      // msgTitle.value = 'Play TV';
      // msgSubTitle.value = 'Video';
    };

    const showTouchHands2 = () => {
      touchHands.value = true;
      touchPosition.x = 285;
      touchPosition.y = 775;
      end = true;
    };

    const touchHandsFunc = () => {
      if (end) {
        touchShow.value = false;
        // close.value = true;
        // showMessageBox.value = false;
        // touchHands.value = false;
        // isShow.value = false;
        setTimer(setTimeout(() => {
          playVideo('musicPlay');
          setPlayed(true);
        }, 0));

        setTimer(setTimeout(() => {
          close.value = true;
          showMessageBox.value = false;
          touchHands.value = false;
          isShow.value = false;
          msgTitle.value = 'Relaxing Music & TV';
          msgSubTitle.value = '';
          showNextButton.value = true;
          isShow.value = true;
          touchMsg.value = 'Finish the experience.';
          dimmedPosition.dimmedWidth = 0;
        }, 5000));

        return;
      }

      setTimer(setTimeout(() => {
        msgTitle.value = 'Relaxing Music & TV';
        msgSubTitle.value = '';

        if (getPlayed() === false) {
          touchShow.value = false;
          playVideo('turnOnTV');
          setPlayed(true);

          setTimer(setTimeout(() => {
            setTimer(setTimeout(() => {
              setTimer(setTimeout(() => {
                touchHands.value = false;
                isShow.value = false;
                close.value = false;
              }, 1000));
              showMessageBox.value = true;
            }, 4000));

            setTimer(setTimeout(() => {
              close.value = true;
              setTimer(setTimeout(() => {
                msgTitle.value = 'Play Music';
                msgSubTitle.value = 'Video';
                dimmedPosition.dimmedY = 588;
                dimmedPosition.dimmedHeight = 270;
                dimmedPosition.dimmedRadius = 25;
                touchPosition.pointY = 95;
                touchPosition.vertical = 'bottom';
                touchPosition.horizontal = 'right';
                touchPosition.width = 410;
                touchPosition.msgX = -360;
                touchPosition.msgY = 109;
                touchShow.value = true;
                touchMsg.value = 'Play relaxing and soothing music for your pet';
                touchHands.value = true;
                touchPosition.x = 285;
                touchPosition.y = 775;
                isShow.value = true;
              }, 1500));
              end = true;
              setPlayed(false);
            }, 9500));
          }, 0));
        }
      }, 0));
    };

    // 스크롤링
    setTimer(setTimeout(() => {
      scrollAni.value = true;
    }, 1500));

    onUnmounted(() => {
      clearTimer();
    });

    return {
      touchShow,
      touchHands,
      scrollAni,
      showNextButton,
      movePage,
      showNextMsg,
      showMessageBox,
      showTouchHands,
      showTouchHands2,
      touchHandsFunc,
      msg,
      close,
      msgBox,
      ...toRefs(touchPosition),
      ...toRefs(dimmedPosition),
      touchMsg,
      isShow,
      msgTitle,
      msgSubTitle,
    };
  },
};
</script>
