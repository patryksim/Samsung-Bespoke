<template>
  <div>
    <page-img>
      <img src="/images/smartthings/tab-img-energy1.png" alt="" />
    </page-img>
    <touch-hands
      v-if="touchHands"
      :x="535"
      :y="335"
      :msgX="0"
      :msgY="80"
      :msgWidth="300"
      :msg="touchMsg"
      :right=true
      :touchMsg=true
      type="energy"
      @click="messageClose"
    />
    <message-box
      :msg="msg"
      :close="close"
    />
    <next-button
      v-if="showNextButton"
      type="energy"
      @click="movePage"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { PageImg } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import TouchHands from '@stComponents/TouchHands.vue';
import MessageBox from '@stComponents/MessageBox.vue';
import { useMutations } from '@/store/helper';
import socket from '@/api/socket';
import NextButton from '@stComponents/NextButton.vue';

export default {
  components: { PageImg, TouchHands, MessageBox, NextButton },
  setup() {
    const close = ref(false);
    const footer = ref('Monitor the energy usage of<br />your home appliances.');
    const router = useRouter();
    const route = useRoute();
    const touchHands = ref(false);
    const touchMsg = ref('Free yourself from worrying about electric bills<br />with SmartThings energy');
    const msg = ref('Free yourself from worrying about electric bills<br />with SmartThings energy');
    const { setLineChart } = useMutations();
    const showNextButton = ref(false);

    const messageClose = () => {
      close.value = true;
      touchHands.value = false;

      if (route.query.sc === 'y') {
        showNextButton.value = true;
      } else {
        router.push({ name: 'TabEnergyPage2' });
      }
    };

    onMounted(() => {
      setTimeout(() => {
        touchHands.value = true;
      }, 1500);

      setLineChart(false);
      socket.emit('energyInit');
    });

    const movePage = () => {
      router.push({ name: 'TabEnergyPage5', query: { sc: 'y' } });
    };

    return {
      messageClose,
      touchHands,
      touchMsg,
      msg,
      close,
      footer,
      showNextButton,
      movePage,
    };
  },
};
</script>
