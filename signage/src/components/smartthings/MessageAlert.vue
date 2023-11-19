<template>
  <wrapper>
    <div ref="alertPopup">
      <div v-if="imgSrc" class="msg_box_icon">
        <img :src="imgSrc" alt="" />
      </div>
      <p :class="[imgSrc ? 'left' : 'center']" v-html="msg"></p>
    </div>
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import { onMounted, ref, watch } from 'vue';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  > div {
    display: flex;
    position: absolute;
    width: calc(100% - 5vw);
    ${vw('padding', [40, 0])};
    ${vw('bottom', 15)};
    align-items: center;
    background: rgba(0, 0, 0, 0.8);
    ${vw('border-radius', 26)};
    z-index: 999;
    opacity: 0;

    .msg_box_icon {
      flex: 0 0 auto;
      ${vw('width', 130)}

      img {
        display: block;
        margin: 0 auto;
        ${vw('width', 47)}
        height: auto;
      }
    }

    > p {
      color: #fff;
      ${vw('font-size', 20)};
      font-family: "SamsungSharpSans";
      font-weight: 700;
      font-style: normal;
      letter-spacing: normal;
      line-height: 1.4;
      &.center {
        text-align: center;
      }
      &.left {
        text-align: left;
      }
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
  components: { Wrapper },
  props: {
    msg: {
      type: String,
      default: '',
    },
    callback: {
      type: Array,
      default: () => [],
    },
    timeout: {
      type: Number,
      default: 3000,
    },
    imgSrc: {
      type: String,
      default: '',
    },
    openTimeout: {
      type: Number,
      default: 1500,
    },
  },
  setup(props) {
    const alertPopup = ref(null);
    let callbackCount = 0;

    onMounted(() => {
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

      watch(() => props.msg, () => {
        const $target = alertPopup.value;
        if ($target) {
          $target.classList.remove('interaction');
          $target.style.opacity = 1;
        }

        setTimeout(getTime, props.timeout);
      });

      setTimeout(() => {
        const $target = alertPopup.value;
        if ($target) $target.style.opacity = 1;

        setTimeout(getTime, props.timeout);
      }, props.openTimeout);
    });

    return {
      alertPopup,
    };
  },
};
</script>
