<template>
  <div>
    <page-side-item type='petcare'/>
    <page-img>
      <img src="/images/smartthings/tab-pet-care-3.png" alt="" />
      <crop-video ref="video" src="/videos/Pet1_1.mp4" :x="118" :y="132" :loading="loading" />
    </page-img>
    <touch-hands
      v-if="touchHands"
      :x="535"
      :y="555"
      :toolTipX="-110"
      :toolTipY="108"
      :toolTipPointY="95"
      :toolTipWidth="280"
      :toolTipMsg="touchMsg"
      :videoToolTip="true"
      :isShow="true"
      vertical='bottom'
      horizontal='right'
      type="petcare"
      @click="videoPlay"
    />
    <message-box
      imgSrc="/images/smartthings/tab-petcare-msgbox-tip.png"
      :msg="msg"
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
      :x="118"
      :y="515"
      :width="dimmedWidth"
      :height="130"
      :radius="18"
      :isShow="isShow"
    />
    <message-header :title="msgTitle" :subTitle="msgSubTitle" />
  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PageImg } from '@/styles/smartthings/common';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import NextButton from '@stComponents/NextButton.vue';
import CropVideo from '@stComponents/CropVideo.vue';
import socket from '@/api/socket';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';

export default {
  components: { PageImg, TouchHands, CropVideo, MessageBox, NextButton, PageDimmed, PageSideItem, MessageHeader },
  setup() {
    const touchHands = ref(false);
    const msg = ref('You can see and record what’s going on<br />through camera');
    const close = ref(false);
    const showNextButton = ref(false);
    const router = useRouter();
    const route = useRoute();
    const video = ref(null);
    const state = ref('waiting');
    const touchMsg = ref('Watch what your pet is doing');
    const isShow = ref(false);

    const msgTitle = ref('Remote Monitoring');
    const msgSubTitle = ref('Video');

    const dimmedPosition = reactive({
      dimmedWidth: 485,
    });

    const movePage = () => {
      isShow.value = false;
      if (route.query.sc === 'y') {
        router.push({ name: 'TabPetCarePage6', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabPetCarePage4' });
      }
    };

    const videoPlay = () => {
      touchHands.value = false;
      isShow.value = false;
      if (state.value === 'waiting') {
        state.value = 'loading';
      }

      socket.emit('playVideo');
      setTimeout(() => {
        state.value = 'playing';
        video.value.$el.getElementsByTagName('video')[0].play();
      }, 1100);

      video.value.$el.getElementsByTagName('video')[0].addEventListener('ended', () => {
        showNextButton.value = true;
        touchMsg.value = 'Finish the experience.';
        isShow.value = true;
        dimmedPosition.dimmedWidth = 0;
        if (route.query.sc === 'y') {
          router.push({ name: 'TabPetCarePage3', query: { sc: 'y' } });
        } else {
          router.push({ name: 'TabPetCarePage3' });
        }
      });
    };

    onMounted(() => {
      setTimeout(() => {
        close.value = true;
        isShow.value = true;
        touchHands.value = true;
      }, 5000);
    });

    return {
      state,
      video,
      videoPlay,
      touchHands,
      showNextButton,
      close,
      msg,
      movePage,
      touchMsg,
      isShow,
      ...toRefs(dimmedPosition),
      msgTitle,
      msgSubTitle,
    };
  },
  computed: {
    loading() {
      return this.state === 'loading';
    },
  },
};
</script>
