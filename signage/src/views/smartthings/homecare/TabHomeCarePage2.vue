<template>
  <page-wrapper>
    <page-side-item type='homecare'/>
    <page-img>
      <img src="/images/smartthings/tab-img-home-care2.png" alt="" />
    </page-img>
    <page-dimmed
      :x="135"
      :y="290"
      :width="145"
      :height="40"
      :radius="25"
      :isShow="isShow"
    />
    <touch-hands
      v-if="showTouchHands"
      :x="190"
      :y="290"
      :toolTipX="-162"
      :toolTipY="90"
      :toolTipWidth="230"
      :toolTipMsg="touchMsg"
      :touchShow="touchShow"
      :isShow="true"
      :videoToolTip="true"
      videoToolTipMsg="Watch the screen"
      vertical='bottom'
      horizontal='left'
      type="homecare"
      @click="messageClose"
    />
    <message-box
      imgSrc="/images/smartthings/tab-homecare-msgbox-tip.png"
      :msg="msg"
      :close="close"
    />
    <message-header :title="msgTitle" />
  </page-wrapper>
</template>

<script>
import { onMounted, ref } from 'vue';
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import socket from '@/api/socket';
import PageSideItem from '@stComponents/PageSideItem.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';

export default {
  components: { PageWrapper, PageImg, TouchHands, MessageBox, PageSideItem, PageDimmed, MessageHeader },
  setup() {
    const isShow = ref(false);
    const showTouchHands = ref(false);
    const touchShow = ref(true);
    const close = ref(false);
    const router = useRouter();
    const route = useRoute();
    const touchMsg = ref('Abnormality is detected');
    const msg = ref('Get informed and guided by AI diagnosis<br />when something goes wrong ');

    const msgTitle = ref('AI diagnosis');

    const messageClose = () => {
      // isShow.value = false;
      // showTouchHands.value = false;
      touchShow.value = false;
      setTimeout(() => {
        socket.emit('showHomeCareMark');
        setTimeout(() => {
          if (route.query.sc === 'y') {
            router.push({ name: 'TabHomeCarePage3', query: { questionMark: true, sc: 'y' } });
          } else {
            router.push({ name: 'TabHomeCarePage3', query: { questionMark: true } });
          }
        }, 4500);
      }, 1500);
    };

    onMounted(() => {
      socket.emit('hideHomeCareMark');
      setTimeout(() => {
        close.value = true;
        setTimeout(() => {
          isShow.value = true;
          showTouchHands.value = true;
        }, 2000);
      }, 5000);
    });

    return {
      touchShow,
      touchMsg,
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
