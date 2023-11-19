<template>
  <div>
    <page-side-item type='petcare'/>
    <page-img>
      <img src="/images/smartthings/tab-pet-care-5.png" alt="" />
    </page-img>
    <touch-hands
      v-if="touchHands"
      :x="x"
      :y="y"
      type="petcare"
      @click="touchHandsFunc"
    />
    <message-alert
      :msg="msg"
      :callback="[showTouchHands]"
      :timeout="3000"
    />
    <next-button
      v-if="showNextButton"
      type="petcare"
      @click="movePage"
    />
    <page-dimmed
      :x="256"
      :y="996"
      :width="207"
      :height="52"
      :radius="50"
      :isShow=isShow
    />
    <message-header :title="msgTitle" :subTitle="msgSubTitle" />
  </div>
</template>
<script>
import { reactive, ref, toRefs } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageAlert from '@stComponents/MessageAlert.vue';
import NextButton from '@stComponents/NextButton.vue';
import socket from '@/api/socket';
import { useRouter, useRoute } from 'vue-router';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';

export default {
  components: { PageImg, TouchHands, MessageAlert, NextButton, PageDimmed, PageSideItem, MessageHeader },
  setup() {
    const touchHands = ref(false);
    const showNextButton = ref(false);
    const router = useRouter();
    const route = useRoute();
    let end = false;
    const isShow = ref(false);

    const msgTitle = ref('Relaxing Music & TV');
    const msgSubTitle = ref('');

    const touchPosition = reactive({
      x: 345,
      y: 1000,
    });

    const msg = ref('Various musics are available too');

    const showTouchHands = () => {
      touchHands.value = true;
      touchPosition.x = 285;
      touchPosition.y = 775;
      end = true;
      isShow.value = true;
      msgTitle.value = 'Play Music';
      msgSubTitle.value = 'Video';
    };

    const touchHandsFunc = () => {
      if (end) {
        touchHands.value = false;
        socket.emit('musicPlay');

        setTimeout(() => {
          showNextButton.value = true;
        }, 5000);
      }
    };

    const movePage = () => {
      if (route.query.sc === 'y') {
        router.push({ name: 'TabPetCarePage6', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabPetCarePage6' });
      }
    };

    return {
      touchHands,
      showTouchHands,
      msg,
      touchHandsFunc,
      ...toRefs(touchPosition),
      showNextButton,
      movePage,
      isShow,
      msgTitle,
      msgSubTitle,
    };
  },
};
</script>
