<template>
  <div>
    <page-side-item type='clothingcare'/>

    <page-img>
      <img src="/images/smartthings/tab-img-clothing-care5.png" alt="" />
    </page-img>

    <page-dimmed
      :isShow="showNextButton"
      :x="0"
      :y="0"
      :width="0"
      :height="0"
    />

    <next-button
      v-if="showNextButton"
      :toolTipX="0"
      :toolTipY="90"
      :toolTipWidth="210"
      toolTipMsg="Finish the experience."
      :isShow="true"
      :hand="true"
      horizontal='right'
      vertical='bottom'
      type="clothingcare"
      @click="movePage"
    />

    <alert-dialog-item
      v-if="showAlertDialog"
      :top="110"
      :width="428"
      :msg="msgRef"
      :close="close"
      @click="messageClose"
    />

    <message-header :title="msgTitle" :subTitle="msgSubTitle" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PageImg } from '@/styles/smartthings/common';
import PageSideItem from '@stComponents/PageSideItem.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import AlertDialogItem from '@stComponents/AlertDialogItem.vue';
import NextButton from '@stComponents/NextButton.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';

export default {
  components: { PageSideItem, PageImg, AlertDialogItem, NextButton, PageDimmed, MessageHeader },
  setup() {
    const close = ref(false);
    const showNextButton = ref(false);
    const showAlertDialog = ref(false);
    const msgRef = ref('Cycle complete. Please remove laundry from your washing machine.');
    const router = useRouter();
    const route = useRoute();

    const msgTitle = ref('Customized Clothing Care');
    const msgSubTitle = ref('One click setting');

    const movePage = () => {
      if (route.query.sc === 'y') {
        router.push({ name: 'TabClothingCarePage6', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabClothingCarePage6' });
      }
    };

    const messageClose = () => {
      close.value = true;
      showNextButton.value = true;
    };

    onMounted(() => {
      setTimeout(() => {
        showAlertDialog.value = true;
      }, 1000);

      setTimeout(() => {
        close.value = true;

        setTimeout(() => {
          showNextButton.value = true;
        }, 1000);
      }, 6000);
    });

    return {
      movePage,
      messageClose,
      close,
      msgRef,
      showNextButton,
      showAlertDialog,
      msgTitle,
      msgSubTitle,
    };
  },
};
</script>
