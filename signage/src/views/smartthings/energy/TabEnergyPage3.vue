<template>
  <page-wrapper>
    <page-side-item type='energy'/>
    <message-header :title="msgTitle" :subTitle="msgSubTitle" />
    <page-img>
      <img src="/images/smartthings/tab-img-energy3.png" alt="" />
    </page-img>
    <save-toggle-item :x="100" :y="125" :save="saveRef"/>
    <base-toggle :x="540" :y="145" :initValue="saveRef"/>
    <base-check-button :x="130" :y="667" :checked="saveRef"/>
    <base-check-button :x="130" :y="750" :checked="saveRef"/>
    <div>
      <base-check-button-list :x="130" :y="882" :checkedAll="saveRef"/>
    </div>
    <touch-hands
      v-if="touchHands"
      :x="535"
      :y="145"
      :toolTipX="-110"
      :toolTipY="105"
      :toolTipPointY="93"
      :toolTipWidth="570"
      :toolTipMsg="touchMsg"
      :isShow="true"
      vertical='bottom'
      horizontal='right'
      type="energy"
      @click="handlerToggleBtnClick"
    />
    <page-dimmed
      :x="100"
      :y="125"
      :width="520"
      :height="95"
      :radius="50"
      :isShow="isShow"
    />
  </page-wrapper>
</template>

<script>
import movePage from '@/composables/movePage';
import BaseToggle from '@stComponents/BaseToggle.vue';
import BaseCheckButton from '@stComponents/BaseCheckButton.vue';
import BaseCheckButtonList from '@stComponents/BaseCheckButtonList.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, onUnmounted, onMounted } from 'vue';
import { PageImg, PageWrapper } from '@/styles/smartthings/common';
import socket from '@/api/socket';
import TouchHands from '@stComponents/TouchHands.vue';
import SaveToggleItem from '@stComponents/SaveToggleItem.vue';
import PageDimmed from '@stComponents/PageDimmed.vue';
import MessageHeader from '@stComponents/MessageHeader.vue';
import PageSideItem from '@stComponents/PageSideItem.vue';
import Timeout from '@/composables/Timeout';

export default {
  components: {
    MessageHeader,
    PageWrapper,
    PageImg,
    BaseToggle,
    BaseCheckButton,
    BaseCheckButtonList,
    TouchHands,
    SaveToggleItem,
    PageDimmed,
    PageSideItem,
  },
  setup() {
    const msgTitle = ref('AI Energy mode');
    const msgSubTitle = ref('');
    const router = useRouter();
    const route = useRoute();
    const touchHands = ref(false);
    const isShow = ref(true);
    const saveRef = ref(route.query.save === 'true');
    const touchMsg = ref('Find out how much you can save this month with AI Energy mode');
    const { setTimer, clearTimer } = Timeout();

    const handlerToggleBtnClick = () => {
      touchHands.value = false;
      isShow.value = false;
      if (route.query.save === 'true') {
        saveRef.value = false;
        socket.emit('chartEnd');

        setTimer(setTimeout(() => {
          if (route.query.sc === 'y') {
            router.push({ name: 'TabEnergyPage2', query: { save: false, sc: 'y' } });
          } else {
            router.push({ name: 'TabEnergyPage2', query: { save: false } });
          }
        }, 1500));
      } else {
        saveRef.value = true;
        socket.emit('saveModeStart');

        setTimer(setTimeout(() => {
          if (route.query.sc === 'y') {
            router.push({ name: 'TabEnergyPage2', query: { save: true, sc: 'y' } });
          } else {
            router.push({ name: 'TabEnergyPage2', query: { save: true } });
          }
        }, 3000));
      }
    };

    socket.emit('aiSavingMode');

    onMounted(() => {
      setTimer(setTimeout(() => {
        touchHands.value = true;
      }, 1500));
    });

    onUnmounted(() => {
      clearTimer();
    });

    return {
      msgTitle,
      msgSubTitle,
      movePage,
      handlerToggleBtnClick,
      saveRef,
      touchHands,
      touchMsg,
      isShow,
    };
  },
};
</script>
