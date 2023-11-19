<template>
  <signage-page
    src="/images/smartthings/energy1.png"
    header="SmartThings Energy"
    :footer="footerRef"
  >
    <progress-item
      ref="childRef"
      :energy="energy"
      subtitle="Refrigerator"
      :barwidth="barwidth"
      :color="color"
      :isShow="isShow"
      :close="close"
      imgurl="/images/smartthings/icon-energy-device.png"
      :y="boxY"
    />
    <save-mode-item :x="240" :y="iconY" v-if="saveModeRef"/>
  </signage-page>
</template>

<script>
import SignagePage from '@/components/smartthings/SignagePage.vue';
import ProgressItem from '@/components/smartthings/ProgressItem.vue';
import { ref } from 'vue';
import socket from '@/api/socket';
import SaveModeItem from '@stComponents/SaveModeItem.vue';

export default {
  components: { SignagePage, ProgressItem, SaveModeItem },
  setup() {
    const barwidth = ref(0);
    const color = ref('transparent');
    const energy = ref(0);
    const boxY = ref(200);
    const iconY = ref(100);
    const isShow = ref(false);
    const close = ref(false);
    const saveModeRef = ref(false);
    const footerRef = ref('Monitor energy usage');
    const childRef = ref(null);

    const energyCountAnim = (to) => {
      let from = energy.value;
      if (from > to) {
        const timer = setInterval(() => {
          if (from <= to) {
            clearInterval(timer);
          } else {
            energy.value = parseFloat((from -= 0.1).toFixed(1));
          }
        }, 1);
      } else {
        const timer = setInterval(() => {
          if (from >= to) {
            clearInterval(timer);
          } else {
            energy.value = parseFloat((from += 0.1).toFixed(1));
          }
        }, 1);
      }
    };
    socket.on('energyInit', () => {
      isShow.value = false;
      barwidth.value = 0;
      footerRef.value = 'Monitor energy usage';

      energyCountAnim(0);
    });
    socket.on('saveModeStart', () => {
      isShow.value = false;
      footerRef.value = 'AI Energy mode';
      saveModeRef.value = true;
    });
    socket.on('energySaving', () => {
      // isShow.value = true;
      // setTimeout(() => {
      //   close.value = true;
      //   nextTick(() => {
      //     childRef.value?.getTime();
      //   });
      // }, 7000);
      barwidth.value = 15;
      color.value = 'green';

      energyCountAnim(39.8);
    });
    socket.on('chartInit', () => {
      isShow.value = false;
      color.value = 'green';
      footerRef.value = 'Monitor energy usage';
      barwidth.value = 30;

      energyCountAnim(30);
    });
    socket.on('chartStart', () => {
      isShow.value = false;
      barwidth.value = 75;
      color.value = 'red';
      footerRef.value = 'Monitor energy usage';
      saveModeRef.value = false;

      energyCountAnim(47.5);
    });
    socket.on('chartEnd', () => {
      isShow.value = false;
      barwidth.value = 75;
      color.value = 'red';
      footerRef.value = 'Monitor energy usage';

      energyCountAnim(47.5);
    });
    socket.on('aiSavingMode', () => {
      isShow.value = false;
      footerRef.value = 'AI Energy mode';
      barwidth.value = 75;
      color.value = 'red';
      saveModeRef.value = false;

      energyCountAnim(47.5);
    });
    socket.on('aiSavingModeEnd', () => {
    });
    return {
      boxY,
      iconY,
      close,
      isShow,
      barwidth,
      color,
      energy,
      saveModeRef,
      footerRef,
      childRef,
    };
  },
};
</script>
