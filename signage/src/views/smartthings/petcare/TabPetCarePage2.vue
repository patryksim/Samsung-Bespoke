<template>
  <page-wrapper>
    <page-side-item type='petcare'/>
    <page-img>
      <img src="/images/smartthings/tab-pet-care-2.png" alt="" />
    </page-img>
    <touch-hands
      v-if="touchHands"
      :x="340"
      :y="920"
      :toolTipX="-305"
      :toolTipY="90"
      :toolTipWidth="440"
      :toolTipMsg="touchMsg"
      :isShow="true"
      vertical='bottom'
      horizontal='right'
      type="petcare"
      @click="messageClose"
    />
    <message-box
      imgSrc="/images/smartthings/tab-petcare-msgbox-tip.png"
      :msg="msg"
      :close="close"
    />
    <message-header :title="msgTitle" />
    <page-dimmed
      :x="118"
      :y="752"
      :width="485"
      :height="240"
      :radius="40"
      :isShow="isShow"
    />
  </page-wrapper>
</template>

<script>
import { ref, onMounted } from 'vue';
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';

export default {
  components: { PageWrapper, PageImg, TouchHands, MessageBox, MessageHeader, PageDimmed, PageSideItem },
  setup() {
    const close = ref(false);
    const router = useRouter();
    const route = useRoute();
    const touchHands = ref(false);
    const msg = ref('Take care of your pets when you are out so<br />you can feel safe');
    const msgTitle = ref('Remote Monitoring');
    const isShow = ref(false);
    const touchMsg = ref('Always stay in touch with remote, mobile pet cam');

    const messageClose = () => {
      close.value = true;
      touchHands.value = false;

      if (route.query.sc === 'y') {
        router.push({ name: 'TabPetCarePage3', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabPetCarePage3' });
      }
    };

    onMounted(() => {
      setTimeout(() => {
        close.value = true;
        setTimeout(() => {
          touchHands.value = true;
          isShow.value = true;
        }, 1500);
      }, 5000);
    });

    return {
      touchHands,
      msg,
      msgTitle,
      messageClose,
      close,
      isShow,
      touchMsg,
    };
  },
};
</script>
