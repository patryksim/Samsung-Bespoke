<template>
  <div>
    <page-side-item type='aircare'/>

    <page-img>
      <img src="/images/smartthings/tab-img-air-care4.png" alt="" />
    </page-img>

    <save-toggle-item :x="100" :y="130" :save="saveRef"/>
    <base-toggle :x="525" :y="155" :initValue="saveRef"/>

    <touch-hands
      v-if="showTouchHands"
      :x="530"
      :y="154"
      :toolTipX="-114"
      :toolTipY="105"
      :toolTipPointX="25"
      :toolTipPointY="93"
      :toolTipWidth="240"
      :toolTipMsg="touchMsg"
      videoToolTipMsg="Watch the screen"
      :isShow="true"
      :videoToolTip="true"
      vertical='bottom'
      horizontal='right'
      type="aircare"
      @click="handlerToggleBtnClick"
    />

    <message-box
      :msg="msg"
      :close="close"
      imgSrc="/images/smartthings/tab-aircare-msgbox-tip.png"
    />

    <message-header :title="msgTitle" />

    <page-dimmed
      :x="100"
      :y="130"
      :width="520"
      :height="95"
      :radius="50"
      :isShow="isShow"
    />
  </div>
</template>

<script>
import { PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import BaseToggle from '@stComponents/BaseToggle.vue';
import SaveToggleItem from '@stComponents/SaveToggleItem.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';

export default {
  components: { PageImg, TouchHands, MessageBox, BaseToggle, SaveToggleItem, PageDimmed, PageSideItem, MessageHeader },
  setup() {
    const showTouchHands = ref(false);
    const close = ref(false);
    const router = useRouter();
    const route = useRoute();
    const msg = ref('Automatically control air purifiers based<br />on air quality.');
    const touchMsg = ref('Turn on air quality keeper.');
    const saveRef = ref(route.query.save === 'true');
    const isShow = ref(false);

    const msgTitle = ref('Air Logic');

    const handlerToggleBtnClick = () => {
      showTouchHands.value = false;
      close.value = true;
      isShow.value = false;

      if (route.query.save === 'true') {
        saveRef.value = false;

        if (route.query.sc === 'y') {
          router.push({ name: 'TabAirCarePage5', query: { save: false, sc: 'y' } });
        } else {
          router.push({ name: 'TabAirCarePage5', query: { save: false } });
        }
      } else {
        saveRef.value = true;

        if (route.query.sc === 'y') {
          router.push({ name: 'TabAirCarePage5', query: { save: true, sc: 'y' } });
        } else {
          router.push({ name: 'TabAirCarePage5', query: { save: true } });
        }
      }
    };

    const movePage = () => {
      router.push({ name: 'TabAirCarePage6', query: { sc: 'y' } });
    };

    onMounted(() => {
      setTimeout(() => {
        showTouchHands.value = true;
        isShow.value = true;
      }, 1500);
    });

    return {
      saveRef,
      close,
      msg,
      touchMsg,
      showTouchHands,
      handlerToggleBtnClick,
      movePage,
      isShow,
      msgTitle,
    };
  },
};
</script>
