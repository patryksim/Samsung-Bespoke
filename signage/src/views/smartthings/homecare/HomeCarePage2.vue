<template>
  <home-care>
    <signage-page
      :class="openRef?'open':'close'"
      :src="imgOpenRef?'/images/smartthings/homecare-open.jpg':'/images/smartthings/homecare-close.jpg'"
      header="SmartThings Home Care"
      footer="AI diagnosis"
    >
      <question-mark-item :x="-200" :y="-350" v-show="showMarkRef" :open="icon"/>
    </signage-page>
  </home-care>
</template>

<script>
import SignagePage from '@/components/smartthings/SignagePage.vue';
import QuestionMarkItem from '@stComponents/QuestionMarkItem.vue';
import { onMounted, ref } from 'vue';
import socket from '@/api/socket';
import styled from 'vue3-styled-components';

const HomeCare = styled.div`
  .close {
    opacity: 1;
  }

  .open {
    animation: tt 1s;
  }

  @keyframes tt {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default {
  components: { SignagePage, QuestionMarkItem, HomeCare },
  setup() {
    const showMarkRef = ref(false);
    const openRef = ref(false);
    const imgOpenRef = ref(false);
    const icon = ref(true);

    socket.on('showHomeCareMark', () => {
      openRef.value = true;
      setTimeout(() => {
        icon.value = false;
        // showMarkRef.value = true;
        imgOpenRef.value = true;
        setTimeout(() => {
          showMarkRef.value = true;
        }, 1000);
      }, 1000);
    });

    socket.on('useHomeCareMark', () => {
      showMarkRef.value = true;
      icon.value = true;
      imgOpenRef.value = true;
    });

    socket.on('hideHomeCareMark', () => {
      showMarkRef.value = false;
      openRef.value = false;
      imgOpenRef.value = false;
    });
    onMounted(() => {
      icon.value = true;
    });
    return {
      showMarkRef,
      imgOpenRef,
      openRef,
      icon,
    };
  },
};
</script>
