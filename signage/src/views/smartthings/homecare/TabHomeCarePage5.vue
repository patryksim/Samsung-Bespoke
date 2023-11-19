<template>
  <div>
    <page-side-item type='homecare'/>
    <page-img>
      <img src="/images/smartthings/tab-img-home-care5.png" alt="" />
    </page-img>
    <page-dimmed
      :x="1500"
      :y="290"
      :width="145"
      :height="40"
      :radius="25"
      :isShow="isShow"
    />
    <message-alert
      imgSrc="/images/smartthings/tab-homecare-msgbox-tip.png"
      :msg="msg"
      :timeout="5000"
      :callback="[showNextButton]"
    />
    <next-button
      v-if="nextButtonRef"
      :toolTipWidth="210"
      :toolTipMsg="touchMsg"
      :isShow="true"
      type="homecare"
      @click="movePage"
    />
    <message-header :title="msgTitle" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import MessageAlert from '@stComponents/MessageAlert.vue';
import NextButton from '@stComponents/NextButton.vue';
import { useRouter, useRoute } from 'vue-router';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';

export default {
  components: { PageImg, MessageAlert, NextButton, PageSideItem, MessageHeader, PageDimmed },
  setup() {
    const msg = ref('Provide filter status, mostly used course and<br />others for each devices');
    const touchMsg = ref('Finish the experience.');
    const nextButtonRef = ref(false);
    const router = useRouter();
    const route = useRoute();
    const isShow = ref(false);
    const msgTitle = ref('Device care');

    const movePage = () => {
      isShow.value = false;
      if (route.query.sc === 'y') {
        router.push({ name: 'TabHomeCarePage6', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabHomeCarePage6' });
      }
    };

    const showNextButton = () => {
      setTimeout(() => {
        isShow.value = true;
        nextButtonRef.value = true;
      }, 1000);
    };

    return {
      msg,
      touchMsg,
      showNextButton,
      nextButtonRef,
      movePage,
      isShow,
      msgTitle,
    };
  },
};
</script>
