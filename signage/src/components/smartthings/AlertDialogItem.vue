<template>
  <wrapper v-bind="{ top, width }">
    <div ref="alertPopup">
      <img :src="imgSrc" v-if="imgSrc" alt="" />
      <p v-html="msg"></p>
      <div>
        <div>Cancel</div>
        <p>|</p>
        <div>OK</div>
      </div>
    </div>
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import { ref, watch } from 'vue';

const Wrapper = styled('div', { top: Number, width: Number })`
  display: flex;
  justify-content: center;
  > div {
    position: absolute;
    ${({ top }) => vw('top', top)};
    ${vw('padding', [25, 30])};
    ${({ width }) => vw('width', width)};
    background: ${({ theme }) => theme.colors.white};
    border-radius: 30px;
    z-index: 999;
    opacity: 0;
    animation: show 1s forwards;
    animation-delay: .5s;
    > img {
      ${vw('width', 110)};
    }
    > p {
      ${vw('margin-top', 10)};
      ${vw('font-size', 18)};
      ${vw('line-height', 25)};
      color: #252525;
    }
    > div:nth-child(3) {
      ${vw('margin-top', 21)};
      ${vw('font-size', 20)};
      color: #dedede;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      > div {
        color: #6BB4E5;
        font-weight: 600;
      }
    }
  }
  > .interaction {
    animation: hide 1s forwards;
  }
`;

export default {
  components: { Wrapper },
  props: {
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
    callback: {
      type: Array,
      default: () => [],
    },
    imgSrc: {
      type: String,
      default: '/images/smartthings/tab-img-smratthings-logo.png',
    },
    top: {
      type: Number,
      default: 30,
    },
    width: {
      type: Number,
      default: 440,
    },
  },
  setup(props) {
    const alertPopup = ref(null);
    let callbackCount = 0;

    const getTime = () => {
      const $target = alertPopup.value;
      if ($target) {
        $target.classList.add('interaction');
      }

      if (!props.callback[callbackCount]) return;

      props.callback[callbackCount]();
      callbackCount += 1;
    };

    watch(() => props.close, () => {
      getTime();
    });

    return {
      alertPopup,
    };
  },
};
</script>
