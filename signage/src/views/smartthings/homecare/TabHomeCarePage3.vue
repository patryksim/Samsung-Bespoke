<template>
  <div>
    <page-side-item type='homecare'/>
    <page-img>
      <img src="/images/smartthings/tab-img-home-care3.png" alt="" />
    </page-img>
    <message-box
      imgSrc="/images/smartthings/tab-homecare-msgbox-tip.png"
      :msg="msg"
      :close="close"
    />
    <page-dimmed
      :x="1500"
      :y="290"
      :width="145"
      :height="40"
      :radius="25"
      :isShow="isShow"
    />
    <next-button
      v-if="showNextButton"
      type="homecare"
      :toolTipWidth="210"
      :toolTipMsg="touchMsg"
      :isShow="true"
      @click="movePage"
    />
    <message-header :title="msgTitle" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import MessageBox from '@stComponents/MessageBox.vue';
import NextButton from '@stComponents/NextButton.vue';
import socket from '@/api/socket';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';

export default {
  components: { PageImg, MessageBox, NextButton, PageSideItem, MessageHeader, PageDimmed },
  setup() {
    const showTouchHands = ref(false);
    const showNextButton = ref(false);
    const close = ref(false);
    const router = useRouter();
    const route = useRoute();
    const msg = ref('Abnormality is detected and guide has <br />been informed');
    const touchMsg = ref('Finish the experience.');
    const isShow = ref(false);

    const msgTitle = ref('AI diagnosis');

    if (route.query.questionTest === 'true') {
      console.log('test');
    } else if (route.query.questionMark === 'true') {
      console.log('mark');
      socket.emit('useHomeCareMark');
    }

    const movePage = () => {
      router.push({ name: 'TabHomeCarePage6', query: { questionTest: true, sc: 'y' } });
    };

    onMounted(() => {
      setTimeout(() => {
        close.value = true;
        setTimeout(() => {
          isShow.value = true;
          showNextButton.value = true;
        }, 1500);
      }, 5000);
    });

    return {
      touchMsg,
      showTouchHands,
      showNextButton,
      close,
      msg,
      movePage,
      isShow,
      msgTitle,
    };
  },
};
</script>
