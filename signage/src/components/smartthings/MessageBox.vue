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
      flex: 1 1 auto;
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

  > .ShowInteraction {
    animation: hide 1.5s forwards;
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
    imgSrc: {
      type: String,
      default: '',
    },
    delay: {
      type: Number,
      default: 1500,
    },
  },
  setup(props) {
    const alertPopup = ref(null);

    const getTime = () => {
      const $target = alertPopup.value;
      if ($target) {
        if (props.close) {
          $target.classList.add('ShowInteraction');
          $target.classList.remove('HideInteraction');
          $target.style.opacity = 0;
        } else {
          $target.classList.add('HideInteraction');
          $target.classList.remove('ShowInteraction');
          $target.style.opacity = 1;
        }
      }
    };

    watch(() => props.close, () => {
      getTime();
    });

    onMounted(() => {
      setTimeout(() => {
        const $target = alertPopup.value;
        if ($target) $target.style.opacity = 1;
      }, props.delay);
    });

    return {
      alertPopup,
    };
  },
};
</script>
