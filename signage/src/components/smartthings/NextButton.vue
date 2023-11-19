<template>
  <wrapper>
    <div ref="alertPopup">
      <img :src="`/images/smartthings/tab-${type}-next-button.svg`" alt="nextBtn" />
      <touch-hands
        :x="6"
        :y="6"
        :type="type"
        v-if="hand"
        :toolTipX="2"
        :toolTipY="90"
        :toolTipWidth="toolTipWidth"
        :toolTipMsg="toolTipMsg"
        :isShow="isShow"
        :toolTipPointY="78"
        :toolTipPointX="18"
        vertical='top'
        horizontal='right'
      />
    </div>
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import { onMounted, ref, watch } from 'vue';
import TouchHands from '@stComponents/TouchHands.vue';

const Wrapper = styled.div`
  position: absolute;
  ${vw('right', 20)};
  ${vw('bottom', 30)};
  display: flex;
  justify-content: right;
  z-index: 999;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    > img {
      ${vw('width', 60)};
      ${vw('height', 60)};
    }
  }
  > .interaction {
    animation: scaleTouchHand 1.5s;

    @keyframes scaleTouchHand {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
`;

export default {
  components: { Wrapper, TouchHands },
  props: {
    type: {
      type: String,
    },
    close: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
    msg: {
      type: String,
      default: '',
    },
    hand: {
      type: Boolean,
      default: true,
    },
    callback: {
      type: Array,
      default: () => [],
    },
    toolTipX: {
      type: Number,
      default: 0,
    },
    toolTipY: {
      type: Number,
      default: 0,
    },
    toolTipWidth: {
      type: Number,
      default: 0,
    },
    toolTipMsg: {
      type: String,
      default: '',
    },
    vertical: {
      type: String,
      default: '',
    },
    horizontal: {
      type: String,
      default: '',
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const alertPopup = ref(null);
    let callbackCount = 0;

    const getTime = () => {
      const $target = alertPopup.value;
      if ($target) {
        $target.classList.add('interaction');
        $target.style.opacity = 0;
      }

      if (!props.callback[callbackCount]) return;

      props.callback[callbackCount]();
      callbackCount += 1;
    };

    watch(() => props.close, () => {
      getTime();
    });

    onMounted(() => {
      setTimeout(() => {
        const $target = alertPopup.value;
        if ($target) $target.style.opacity = 1;
      }, 1500);
    });

    return {
      alertPopup,
    };
  },
};
</script>
