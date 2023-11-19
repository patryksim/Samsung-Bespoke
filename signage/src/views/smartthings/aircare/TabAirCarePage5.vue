<template>
  <page-wrapper>
    <page-side-item type='aircare'/>

    <living-ani-img :livingAni="livingAni">
      <img
        :src="
          veryBad ? '/images/smartthings/tab-img-air-care5-a.png' :
          bad ? '/images/smartthings/tab-img-air-care5-b.png' :
          normal ? '/images/smartthings/tab-img-air-care5-c.png' :
          good ? '/images/smartthings/tab-img-air-care5-d.png' : 'test'"
        alt=""
      />
    </living-ani-img>

    <popup-message-item
      :x="350"
      :y="440"
      :toolTipX="-105"
      :toolTipY="90"
      :toolTipWidth="190"
      :toolTipHeight="230"
      vertical='bottom'
      horizontal='left'
      :isShow="isShow"
      toolTipMsg='Purifying indoor air.'
    />

    <next-button
      v-if="showNextButton"
      type="aircare"
      :toolTipWidth="210"
      :toolTipMsg="touchMsg"
      :isShow="true"
      @click="movePage"
    />

    <message-box
      v-if="showMessageBox"
      :msg="msg"
      :close="close"
    />

    <message-header :title="msgTitle" />

    <page-dimmed
      :x="118"
      :y="120"
      :width="dimmedWidth"
      :height="389"
      :radius="25"
      :isShow="true"
    />
  </page-wrapper>
</template>

<script>
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import styled from 'vue3-styled-components';
import MessageBox from '@stComponents/MessageBox.vue';
import NextButton from '@stComponents/NextButton.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import PopupMessageItem from '@stComponents/PopupMessageItem.vue';

const LivingAniImg = styled(PageImg)`
  img {
    opacity: 0;
    transition: opacity 0.5s;
    ${({ livingAni }) => livingAni && 'opacity: 1;'};
  }
`;

export default {
  components: { PageWrapper, LivingAniImg, MessageBox, NextButton, PageDimmed, PageSideItem, MessageHeader, PopupMessageItem },
  setup() {
    const showMessageBox = ref(false);
    const showTouchHands = ref(false);
    const showNextButton = ref(false);
    const close = ref(false);
    const router = useRouter();
    const route = useRoute();
    const veryBad = ref(true);
    const bad = ref(false);
    const normal = ref(false);
    const good = ref(false);
    const livingAni = ref(true);
    const msg = ref('Automatically control air purifiers based on air quality.');
    const touchMsg = ref('Finish the experience.');
    const isShow = ref(true);
    const dimmedWidth = ref(479);

    const msgTitle = ref('Air Control');

    const movePage = () => {
      if (route.query.sc === 'y') {
        router.push({ name: 'TabAirCarePage6', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabAirCarePage6' });
      }
    };

    onMounted(() => {
      setTimeout(() => {
        isShow.value = true;
      }, 1500);
      setTimeout(() => {
        veryBad.value = false;
        bad.value = true;
      }, 5350);
      setTimeout(() => {
        bad.value = false;
        normal.value = true;
      }, 7900);
      setTimeout(() => {
        normal.value = false;
        good.value = true;
        // showMessageBox.value = true;
      }, 10800);
      setTimeout(() => {
        close.value = true;
        showNextButton.value = true;
        dimmedWidth.value = 0;
        isShow.value = false;
      }, 15450);
    });

    return {
      close,
      veryBad,
      bad,
      normal,
      good,
      livingAni,
      movePage,
      msg,
      showNextButton,
      showTouchHands,
      showMessageBox,
      msgTitle,
      touchMsg,
      isShow,
      dimmedWidth,
    };
  },
};
</script>
