<template>
  <page-wrapper>
    <page-side-item type='aircare'/>

    <scroll-image :scrollImg="scrollImg">
      <img src="/images/smartthings/tab-img-air-care2.png" alt="" />
    </scroll-image>

    <living-ani-img :livingAni="livingAni">
      <img :src="afterImg ? '/images/smartthings/aircare-2-before.png' : '/images/smartthings/aircare-2-after.png'" alt="" />
    </living-ani-img>

    <tabMenu>
      <img src="/images/smartthings/aircare-2-tab.png" alt="tabMenu"/>
    </tabMenu>

    <touch-hands
      v-if="roomTouchHand"
      type="aircare"
      @click="roomMenuFunc"
      :x="190"
      :y="438"
      :toolTipX="-162"
      :toolTipY="90"
      :toolTipWidth="290"
      :toolTipMsg="touchMsg"
      :isShow='true'
      vertical='bottom'
      horizontal='left'
    />

    <message-box
      v-if="showMsg"
      :msg="msg"
      :close="close"
      imgSrc="/images/smartthings/tab-aircare-msgbox-tip.png"
    />

    <next-button
      v-if="showNextButton"
      type="aircare"
      :isShow="true"
      :toolTipWidth="210"
      toolTipMsg="Finish the experience."
      @click="movePage"
    />

    <message-header :title="msgTitle" />

    <page-dimmed
      :x="100"
      :y="429"
      :width="dimmedWidth"
      :height="66"
      :radius="0"
      :isShow="isShow"
    />
  </page-wrapper>
</template>

<script>
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { vw } from '@/styles/mixin';
import styled from 'vue3-styled-components';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import NextButton from '@stComponents/NextButton.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';

const tabMenu = styled.div`
  position: absolute;
  bottom: -1vw;
  left: 50%;
  transform: translateX(-50%);
  > img {
    ${vw('width', 520)};
    ${vw('height', 80)};
  }
`;

const ScrollImage = styled(PageImg, { scrollImg: Boolean })`
  font-size: 0;

  > img:nth-child(1) {
    ${vw('width', 520)}
    height: auto;
    transition:margin-top 3s;
    ${({ scrollImg }) => scrollImg && 'margin-top: -68vh;'};
  }
`;

const LivingAniImg = styled(PageImg, { livingAni: Boolean })`
  img {
    position: absolute;
    ${vw('width', 280)};
    ${vw('height', 242)};
    ${vw('top', 480)};
    ${vw('left', 240)};
    opacity: 0;
    transition: opacity 0.5s;
    ${({ livingAni }) => livingAni && 'opacity: 1;'};
  }
`;

export default {
  components: { PageWrapper, LivingAniImg, ScrollImage, TouchHands, MessageBox, tabMenu, NextButton, PageDimmed, PageSideItem, MessageHeader },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const roomTouchHand = ref(false);
    const livingAni = ref(false);
    const livingAniAfter = ref(false);
    const afterImg = ref(false);
    const showNextButton = ref(false);
    const isShow = ref(false);

    const msgTitle = ref('Air Graphic');

    let scroll = false;
    const scrollImg = ref(false);

    const showMsg = ref(true);
    const msg = ref('Ensure the air quality in your house stays<br />fresh and pleasant.');
    const touchMsg = ref('Monitor air quality in your home.');
    const close = ref(false);
    const dimmedWidth = ref(530);

    const controlHand = ref(false);

    const movePage = () => {
      if (showNextButton.value === true) {
        router.push({ name: 'TabAirCarePage6', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabAirCarePage6' });
      }
    };

    const msgFunc = () => {
      msg.value = 'Provide visualized air quality to help you<br />understand indoor air quality.';

      setTimeout(() => {
        showMsg.value = true;
        close.value = false;

        setTimeout(() => {
          close.value = true;

          setTimeout(() => {
            dimmedWidth.value = 0;
            isShow.value = true;

            if (route.query.sc === 'y') {
              showNextButton.value = true;
            } else {
              router.push({ name: 'TabAirCarePage3' });
            }
          }, 1500);
        }, 5000);
      }, 1500);
    };

    const scrollFunc = () => {
      if (scroll) {
        setTimeout(() => {
          scrollImg.value = true;
          msgFunc();
        }, 1500);
      }
    };

    setTimeout(() => {
      close.value = true;

      setTimeout(() => {
        roomTouchHand.value = true;
        isShow.value = true;
      }, 1500);
    }, 5000);

    const roomMenuFunc = () => {
      roomTouchHand.value = false;
      isShow.value = false;

      if (!scroll) {
        close.value = true;

        setTimeout(() => {
          livingAni.value = true;

          setTimeout(() => {
            afterImg.value = true;

            setTimeout(() => {
              livingAni.value = false;
              scroll = true;
              showMsg.value = false;
              scrollFunc();
            }, 1500);
          }, 1000);
        }, 1000);
      }
    };

    return {
      roomTouchHand,
      livingAni,
      livingAniAfter,
      afterImg,
      scrollImg,
      showMsg,
      msg,
      close,
      controlHand,
      roomMenuFunc,
      scrollFunc,
      movePage,
      showNextButton,
      msgTitle,
      isShow,
      touchMsg,
      dimmedWidth,
    };
  },
};
</script>
