<template>
  <page-wrapper>
    <page-side-item type='clothingcare'/>
    <page-img>
      <img src="/images/smartthings/tab-img-clothing-care2.png" alt="" />
    </page-img>

    <page-dimmed
      :isShow="showTouchHands"
      v-bind="addCustomCycleDimmed"
    />

    <touch-hands
      v-if="showTouchHands"
      :x="335"
      :y="1050"
      :toolTipX="-309"
      :toolTipY="258"
      :toolTipWidth="420"
      :toolTipMsg="touchMsg"
      :toolTipPointY="247"
      :isShow="true"
      :videoToolTip="false"
      vertical='top'
      horizontal='right'
      type="clothingcare"
      @click="touchHandsFunc"
    />

    <message-alert
      :msg="msg"
      :timeout="5000"
      imgSrc="/images/smartthings/tab-clothingcare-msgbox-tip.png"
    />
    <message-header :title="msgTitle" :subTitle="msgSubTitle" />
  </page-wrapper>
</template>

<script>
import { onMounted, ref } from 'vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import PageDimmed from '@stComponents/PageDimmed.vue';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageAlert from '@stComponents/MessageAlert.vue';
import { useRouter, useRoute } from 'vue-router';
import MessageHeader from '@stComponents/MessageHeader.vue';

export default {
  components: { PageWrapper, PageSideItem, PageImg, PageDimmed, TouchHands, MessageAlert, MessageHeader },
  setup() {
    const showTouchHands = ref(false);
    const msg = ref('Optimized clothing care manages washing<br />and drying to fit your circumstances.');
    const touchMsg = ref('Create custom cycles based on your lifestyle.');
    const router = useRouter();
    const route = useRoute();

    const msgTitle = ref('Customized Clothing Care');
    const msgSubTitle = ref('Custom cycle');

    const touchHandsFunc = () => {
      showTouchHands.value = false;

      if (route.query.sc === 'y') {
        router.push({ name: 'TabClothingCarePage3', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabClothingCarePage3' });
      }
    };

    const addCustomCycleDimmed = {
      x: 147,
      y: 867,
      width: 425,
      height: 289,
      radius: 35,
    };

    onMounted(() => {
      setTimeout(() => {
        showTouchHands.value = true;
      }, 6500);
    });

    return {
      msg,
      touchMsg,
      showTouchHands,
      touchHandsFunc,
      addCustomCycleDimmed,
      msgTitle,
      msgSubTitle,
    };
  },
};
</script>
