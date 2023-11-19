<template>
  <wrapper
    :x="x"
    :y="y"
    :toolTipX="toolTipX"
    :toolTipY="toolTipY"
    :toolTipWidth="toolTipWidth"
    :isShow="isShow"
    @click="handleClick"
  >
    <div v-if="isShow" :class="[vertical === 'top' ? 'top-tool-tip' : 'bottom-tool-tip']">
      <img src="/images/smartthings/tab-icon-tool-tip.svg" alt="">
    </div>
    <div v-if="isShow" :class="[horizontal === 'right' ? 'right' : 'left', vertical === 'top' ? 'top' : 'bottom', 'touch_msg']">
      <p v-html="toolTipMsg" class="tooltip_info"></p>
    </div>
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import { onMounted, ref } from 'vue';

const baseProps = {
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
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
};

const Wrapper = styled('div', { ...baseProps, color: String })`
  position: absolute;
  z-index: 9999;
  ${({ x }) => vw('left', x)}
  ${({ y }) => vw('top', y)}
  ${vw('width', 48)}
  ${vw('height', 48)}

  .touch_msg {
    position: absolute;
    z-index: 6
    ${({ toolTipWidth }) => vw('width', toolTipWidth)}
    ${vw('padding', [25, 30])}
    background: #000;
    opacity: 0.8;
    border-radius: 20px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.15);

    > hr {
      ${vw('margin', [20, 0])}
    }

    > .tooltip_info {
      ${vw('padding', [0, 10])};
      color: #fff;
      ${vw('font-size', 16)};
      font-family: "SamsungSharpSans";
      font-weight: 500;
      font-style: normal;
      ${vw('line-height', 22)}
      text-align: center;
    }
  }

  .top {
    ${({ toolTipY }) => vw('bottom', toolTipY)}
  }

  .bottom {
    ${({ toolTipY }) => vw('top', toolTipY)}
  }

  .right{
    ${({ toolTipX }) => vw('right', toolTipX)}
  }

  .left{
    ${({ toolTipX }) => vw('left', toolTipX)}
  }

  .top-tool-tip {
    position: absolute;
    ${vw('width', 15)}
    ${vw('height', 15)}
    z-index:9999;
    transform: rotate(180deg);
    ${vw('bottom', 77)}
    ${vw('left', 19)}
    ${({ toolTipPointY }) => toolTipPointY && vw('bottom', toolTipPointY)}
    ${({ toolTipPointX }) => toolTipPointX && vw('left', toolTipPointX)}

    > img {
      width: 100%;
      height: 100%;
    }
  }

  .bottom-tool-tip {
    position: absolute;
    ${vw('width', 15)}
    ${vw('height', 15)}
    z-index:9999;
    ${vw('top', 77)}
    ${vw('left', 19)}
    ${({ toolTipPointY }) => toolTipPointY && vw('top', toolTipPointY)}
    ${({ toolTipPointX }) => toolTipPointX && vw('left', toolTipPointX)}

    > img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default {
  components: { Wrapper },
  props: baseProps,
  setup(props) {
    const vertical = ref('');
    const horizontal = ref('');
    const handRef = ref(null);
    const state = ref(true);

    const handleClick = () => {
      state.value = true;
    };

    onMounted(() => {
      if (props.vertical === 'top') {
        vertical.value = 'top';
      } else {
        vertical.value = 'bottom';
      }

      if (props.horizontal === 'left') {
        horizontal.value = 'left';
      } else {
        horizontal.value = 'right';
      }

      if (props.target) {
        const $target = document.querySelector(props.target);
        if (!$target) return;

        const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = $target;
        handRef.value.$el.style = `
          left: ${offsetLeft + (offsetWidth / 2)}px;
          top: ${offsetTop + (offsetHeight / 2)}px;
          transform: translateX(-30%);
        `;
      }
    });

    return {
      vertical,
      horizontal,
      handRef,
      state,
      handleClick,
    };
  },
};
</script>
