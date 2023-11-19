<template>
  <page-wrapper>
    <page-side-item type='homecare'/>
    <page-img>
      <img src="/images/smartthings/tab-img-home-care4.png" alt="" />
    </page-img>
    <touch-hands
      v-if="showTouchHands"
      :x="530"
      :y="440"
      :toolTipX="-112"
      :toolTipY="90"
      :toolTipWidth="410"
      :toolTipMsg="msg"
      :isShow="true"
      :videoToolTip="false"
      vertical='top'
      horizontal='right'
      type="homecare"
      @click="messageClose"
    />
    <page-dimmed
      :x="118"
      :y="422"
      :width="480"
      :height="470"
      :radius="40"
      :isShow="isShow"
    />
    <message-header :title="msgTitle" />
  </page-wrapper>
</template>

<script>
import { onMounted, ref } from 'vue';
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import TouchHands from '@stComponents/TouchHands.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';

export default {
  components: { PageWrapper, PageImg, TouchHands, PageSideItem, PageDimmed, MessageHeader },
  setup() {
    const showTouchHands = ref(false);
    const close = ref(false);
    const router = useRouter();
    const route = useRoute();
    const msg = ref('Check your device’s status and usage pattern');
    const isShow = ref(true);

    const msgTitle = ref('Device care');

    const messageClose = () => {
      close.value = true;
      showTouchHands.value = false;
      isShow.value = false;

      if (route.query.sc === 'y') {
        router.push({ name: 'TabHomeCarePage5', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabHomeCarePage5' });
      }
    };

    onMounted(() => {
      setTimeout(() => {
        showTouchHands.value = true;
      }, 1500);
    });

    return {
      showTouchHands,
      messageClose,
      close,
      msg,
      isShow,
      msgTitle,
    };
  },
};
</script>
