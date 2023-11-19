<template>
  <page-wrapper>
    <page-side-item type='aircare'/>

    <page-img>
      <img src="/images/smartthings/tab-img-air-care3.png" alt="" />
    </page-img>

    <base-toggle :x="510" :y="438" :initValue="saveRef"/>

    <touch-hands
      v-if="touchHands"
      :x="504"
      :y="439"
      :toolTipX="-140"
      :toolTipY="105"
      :toolTipPointY="93"
      :toolTipWidth="420"
      :toolTipMsg="touchMsg"
      :isShow="true"
      vertical='top'
      horizontal='right'
      type="aircare"
      @click="handlerToggleBtnClick"
    />

    <page-dimmed
      :x="118"
      :y="423"
      :width="480"
      :height="310"
      :radius="30"
      :isShow="isShow"
    />

    <message-header :title="msgTitle" />
  </page-wrapper>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import BaseToggle from '@stComponents/BaseToggle.vue';
import TouchHands from '@stComponents/TouchHands.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';

export default {
  components: { PageWrapper, PageImg, BaseToggle, TouchHands, PageDimmed, PageSideItem, MessageHeader },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const saveRef = ref(route.query.save === 'true');
    const touchHands = ref(false);
    const touchMsg = ref('Keep optimal air quality with air quality keeper.');
    const isShow = ref(true);

    const msgTitle = ref('Air Logic');

    const handlerToggleBtnClick = () => {
      isShow.value = false;

      if (route.query.save === 'true') {
        saveRef.value = false;
      } else {
        saveRef.value = true;
        touchHands.value = false;
      }

      if (route.query.sc === 'y') {
        router.push({ name: 'TabAirCarePage4', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabAirCarePage4' });
      }
    };

    onMounted(() => {
      setTimeout(() => {
        touchHands.value = true;
      }, 1000);
    });

    return {
      handlerToggleBtnClick,
      saveRef,
      touchHands,
      msgTitle,
      touchMsg,
      isShow,
    };
  },
};
</script>
