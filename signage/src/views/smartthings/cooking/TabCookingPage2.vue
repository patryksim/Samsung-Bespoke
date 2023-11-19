<template>
  <page-wrapper>
    <message-header title="Cook inspiration" subTitle="" />
    <page-side-item type="cooking" />
    <page-img>
      <img src="/images/smartthings/tab-img-cooking2.png" alt="" />
    </page-img>
    <page-dimmed
      :x="343"
      :y="512"
      :width="209"
      :height="230"
      :radius="25"
      :isShow="isDimmedShow"
    />
    <touch-hands
      v-if="touchHands"
      :x="420"
      :y="680"
      :toolTipX="-225"
      :toolTipY="90"
      :toolTipWidth="390"
      :toolTipMsg="touchMsg"
      :isShow="true"
      vertical="bottom"
      horizontal="right"
      type="cooking"
      @click="pageMove"
    />
    <message-box
      :msg="msg"
      :close="close"
      imgSrc="/images/smartthings/tab-cooking-msgbox-tip.png"
    />
  </page-wrapper>
</template>

<script>
import { ref, onUnmounted, onMounted } from 'vue';
import { PageWrapper, PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import TouchHands from '@stComponents/TouchHands.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import Timeout from '@/composables/Timeout';

export default {
  components: { PageWrapper, PageImg, TouchHands, PageDimmed, PageSideItem, MessageBox, MessageHeader },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isDimmedShow = ref(false);
    const close = ref(false);
    const touchHands = ref(false);
    const touchMsg = ref('Discover recipe of Tomato eggplant gratain.');
    const msg = ref('Discover step-by-step recipes based on<br />your favorites seasonal ingredients');
    const { setTimer, clearTimer } = Timeout();

    onMounted(() => {
      setTimer(setTimeout(() => {
        touchHands.value = true;
        isDimmedShow.value = true;
      }, 1500));
    });

    const pageMove = () => {
      close.value = true;
      isDimmedShow.value = false;

      if (route.query.sc === 'y') {
        router.push({ name: 'TabCookingPage3', query: { sc: 'y' } });
      } else {
        router.push({ name: 'TabCookingPage3' });
      }
    };

    onUnmounted(() => {
      clearTimer();
    });

    return {
      PageDimmed,
      pageMove,
      touchMsg,
      touchHands,
      isDimmedShow,
      close,
      msg,
    };
  },
};
</script>
