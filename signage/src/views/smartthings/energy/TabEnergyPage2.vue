<template>
  <page-wrapper>
    <page-side-item type='energy'/>
    <message-header :title="msgTitle" :subTitle="msgSubTitle" />
    <page-img>
      <img src="/images/smartthings/tab-img-energy2.png" alt="" />
      <animate-image :x="129" :y="569" :start="animationStart" :save="$route.query.save === 'true'"/>
    </page-img>
    <page-dimmed
      :x="100"
      :y="dimmedY"
      :width="dimmedWidth"
      :height="470"
      :isShow="isShow"
      :radius="0"
    />
    <touch-hands
      v-if="touchHands"
      :x="x"
      :y="y"
      :toolTipX="msgX"
      :toolTipY="90"
      :toolTipWidth="width"
      :toolTipMsg="touchMsg"
      :isShow="true"
      :videoToolTip="false"
      :vertical="vertical"
      :horizontal="horizontal"
      type="energy"
      @click="handlerClick"
    />
    <message-alert
      v-if="showMessageAlert"
      :msg="msg"
      :callback="[showTouchHands]"
      :timeout="5000"
      imgSrc="/images/smartthings/tab-energy-msgbox-tip.png"
    />
    <message-box
      imgSrc="/images/smartthings/tab-energy-msgbox-tip.png"
      v-if="showMessageBox"
      :msg="msgBox"
      :close="close"
    />
    <next-button
      v-if="showNextButton"
      type="energy"
      @click="movePage"
      :toolTipWidth="210"
      :toolTipMsg="toolTipMsg"
      :isShow="true"
    />
  </page-wrapper>
</template>

<script>
import { ref, onMounted, reactive, toRefs, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import { useMutations, useState } from '@/store/helper';
import socket from '@/api/socket';
import TouchHands from '@stComponents/TouchHands.vue';
import AnimateImage from '@/components/smartthings/AnimateImage.vue';
import MessageAlert from '@stComponents/MessageAlert.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import NextButton from '@stComponents/NextButton.vue';
import Timeout from '@/composables/Timeout';

export default {
  components: { PageWrapper, PageImg, TouchHands, AnimateImage, MessageAlert, MessageBox, PageSideItem, PageDimmed, MessageHeader, NextButton },
  setup() {
    const isShow = ref(false);
    const route = useRoute();
    const router = useRouter();
    const touchHands = ref(false);
    const showNextButton = ref(false);
    const close = ref(false);
    const showMessageAlert = ref(false);
    const showMessageBox = ref(false);
    const animationStart = ref(false);
    const { setLineChart } = useMutations();
    const { lineChart } = useState();

    const msgTitle = ref('Monitor energy usage');
    const msgSubTitle = ref('Current usage');
    const msgBox = ref('Monitor the energy usage of your home<br />appliances.');
    const msg = ref('SmartThings shows your estimated<br />monthly usage.');
    const touchMsg = ref('Find out how much energy you used.');
    const toolTipMsg = ref('Finish the experience.');
    const isTouchMsg = ref(false);
    const vertical = ref('top');
    const horizontal = ref('rigth');
    const { setTimer, clearTimer } = Timeout();

    const dimmedWidth = ref(520);
    const dimmedY = ref(402);
    const touchPosition = reactive({
      x: 326,
      y: 600,
      msgX: -320,
      msgY: 80,
      width: 330,
    });

    const showTouchHands = () => {
      showMessageBox.value = true;
      touchMsg.value = 'Find out where all the energy has been used.';
      vertical.value = 'top';
      horizontal.value = 'right';
      dimmedY.value = 1060;
      isShow.value = true;
      touchPosition.x = 495;
      touchPosition.y = 1085;
      touchHands.value = true;
      touchPosition.msgX = -150;
      touchPosition.width = 400;
    };

    const handlerClick = () => {
      isShow.value = false;
      // 현재 에너지 그래프
      if (animationStart.value === false) {
        touchHands.value = false;
        close.value = true;
        animationStart.value = true;

        setTimer(setTimeout(() => {
          socket.emit('chartInit');
        }, 100));

        setTimer(setTimeout(() => {
          isShow.value = true;
          touchMsg.value = 'Find out how much you will use this month.';
          touchHands.value = true;
          touchPosition.x = 440;
          touchPosition.y = 568;
          touchPosition.msgX = -205;
          touchPosition.width = 380;
          vertical.value = 'bottom';
          horizontal.value = 'right';
        }, 2300));

        return;
      }

      // 예상 에너지 그래프
      if (lineChart.value === false) {
        msgSubTitle.value = 'Estimated usage';
        close.value = true;
        touchHands.value = false;

        showMessageAlert.value = true;
        setLineChart(true);
        socket.emit('chartStart');

        return;
      }

      router.push({ name: 'TabEnergyPage4', query: { sc: 'y' } });
    };

    onMounted(() => {
      if (route.query.save !== 'true') {
        isShow.value = true;

        setLineChart(false);
        socket.emit('energyInit');

        setTimer(setTimeout(() => {
          touchHands.value = true;
          isTouchMsg.value = true;
        }, 1500));
        showMessageBox.value = true;
      } else {
        socket.emit('chartStart');
        socket.emit('saveModeStart');
        msgTitle.value = 'AI Energy mode';
        msgSubTitle.value = '';
        touchHands.value = false;
        animationStart.value = true;
        touchHands.value = false;
        setTimer(setTimeout(() => {
          showMessageBox.value = true;
        }, 1500));

        msgBox.value = 'Automatically use 70%(WM), 30%(REF), 40%(EHS) less energy with AI Energy mode';

        setTimer(setTimeout(() => {
          socket.emit('aiSavingModeEnd');
          setTimer(setTimeout(() => {
            close.value = true;
            touchHands.value = false;
            showNextButton.value = true;
            isShow.value = true;
            dimmedWidth.value = 0;
          }, 3000));
        }, 7000));
        setLineChart(true);
      }
    });

    onUnmounted(() => {
      clearTimer();
    });

    const movePage = () => {
      router.push({ name: 'TabEnergyPage5', query: { sc: 'y' } });
    };

    return {
      vertical,
      horizontal,
      dimmedWidth,
      dimmedY,
      touchHands,
      animationStart,
      handlerClick,
      showTouchHands,
      showMessageAlert,
      showNextButton,
      showMessageBox,
      msgBox,
      close,
      msgTitle,
      msgSubTitle,
      msg,
      isShow,
      ...toRefs(touchPosition),
      touchMsg,
      isTouchMsg,
      movePage,
      toolTipMsg,
    };
  },
};
</script>
