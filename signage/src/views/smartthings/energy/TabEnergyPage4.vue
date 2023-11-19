<template>
  <div>
    <page-side-item type='energy'/>
    <message-header :title="msgTitle" :subTitle="msgSubTitle" />
    <page-img>
      <img src="/images/smartthings/tab-img-energy4.png" alt="" />
    </page-img>
    <message-box
      imgSrc="/images/smartthings/tab-energy-msgbox-tip.png"
      :msg="msg"
      :close="close"
    />
    <next-button
      v-if="nextButtonRef"
      type="energy"
      :toolTipWidth="210"
      :toolTipMsg="touchMsg"
      :isShow="true"
      @click="movePage"
    />
    <page-dimmed
      :x="110"
      :y="30"
      :width="0"
      :height="172"
      :radius="30"
      :isShow="isShow"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import NextButton from '@stComponents/NextButton.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';

export default {
  components: { NextButton, MessageBox, PageImg, MessageHeader, PageDimmed, PageSideItem },
  setup() {
    const router = useRouter();
    const showTouchHands = ref(false);
    const nextButtonRef = ref(false);
    const touchMsg = ref('Finish the experience.');
    const msgTitle = ref('Monitor energy usage');
    const msgSubTitle = ref('Report');
    const msg = ref('SmartThings report helps you understand<br />your energy usage and patterns.');
    const close = ref(false);
    const isShow = ref(false);

    const movePage = () => {
      router.push({ name: 'TabEnergyPage5', query: { sc: 'y' } });
    };

    const showNextButton = () => {
      showTouchHands.value = false;
    };

    onMounted(() => {
      setTimeout(() => {
        nextButtonRef.value = true;
        showTouchHands.value = true;
        close.value = true;
        isShow.value = true;
      }, 5000);
    });

    return {
      touchMsg,
      msgTitle,
      msgSubTitle,
      movePage,
      showTouchHands,
      showNextButton,
      nextButtonRef,
      msg,
      close,
      isShow,
    };
  },
};
</script>
