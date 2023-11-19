<template>
  <wrapper
    :x="x"
    :y="y"
    :toolTipX="toolTipX"
    :toolTipY="toolTipY"
    :toolTipWidth="toolTipWidth"
    :isShow="isShow"
    :videoToolTip="videoToolTip"
    @click="handleClick"
  >
    <div>
      <div v-show="touchShow" class="black" v-if="color === 'black'">
        <img src="/images/smartthings/tab-icon-touch-hand-black.png" alt="">
      </div>
      <div class="blue" v-if="color === 'blue'">
        <img src="/images/smartthings/tab-icon-touch-hand-blue.png" alt="">
      </div>
    </div>
    <div v-show="touchShow" :class="{'touch': state}" v-if="color !== 'blue'"></div>
    <div v-if="isShow" :class="[vertical === 'top' ? 'top-tool-tip' : 'bottom-tool-tip']">
      <img src="/images/smartthings/tab-icon-tool-tip.svg" alt="">
    </div>
    <div v-if="isShow" :class="[horizontal === 'right' ? 'right' : 'left', vertical === 'top' ? 'top' : 'bottom', 'touch_msg']">
      <p v-html="toolTipMsg" class="tooltip_info"></p>
      <hr v-show="videoToolTip" />
      <p v-show="videoToolTip" class="tooltip_video_info">{{videoToolTipMsg}}</p>
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
  target: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'black',
  },
  touchShow: {
    type: Boolean,
    default: true,
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
  videoToolTip: {
    type: Boolean,
    default: false,
  },
  videoToolTipMsg: {
    type: String,
    default: 'Watch video on the screen',
  },
};

const Wrapper = styled('div', { ...baseProps, color: String })`
  position: absolute;
  z-index: 9999;
  ${({ x }) => vw('left', x)}
  ${({ y }) => vw('top', y)}
  ${vw('width', 48)}
  ${vw('height', 48)}

  > div:first-child {
    > div {
      position: absolute;
      top: 50%;
      left: 50%;
      ${vw('width', 30)}
      ${vw('padding-top', 30)}
      transform: translate(-50%, -50%);
      z-index: 2;
      animation: show 1.8s;

      > img {
        width: 100%;
        height: 100%;
      }
    }

    >.blue {
      padding-top: 0;
    }
    >.black {
      ${vw('padding-left', 4)}
    }
  }

  > div:nth-child(2) {
    position: relative;
    width: 100%;
    height: 100%;
    background: ${({ theme, type }) => theme.smartthings[type].border};
    border-radius: 100%;
    opacity: 0.5;
  }

  > .touch {
    display:flex;
    align-items:center;
    justify-content:center;
    animation: scaleTouchHand 1.5s;
    animation-iteration-count: infinite;

    @keyframes scaleTouchHand {
      0% {
        transform: scale(1.2);
        opacity: 0;
      }
      20% {
        transform: scale(1);
        opacity: 0.8;
      }
      100% {
        transform: scale(1.2);
        opacity: 0;
      }
    }

    :before {
      content: '';
      ${vw('width', 55)}
      ${vw('height', 55)}
      border: ${({ theme, type }) => theme.smartthings[type].border} solid 2px;
      border-radius: 50%;
      position: absolute;
      ${({ theme, type }) => type && `
        background: radial-gradient(
          transparent 50%,
          ${theme.smartthings[type].background},
          ${theme.smartthings[type].border});
      `};
      animation: scale 1.5s;
      animation-iteration-count: infinite;

      @keyframes scale {
        0% {
          transform: scale(1);
          opacity: 0;
        }
        10% {
          transform: scale(1);
          opacity: 0;
        }
        100% {
          transform: scale(1.6);
          opacity: 1;
        }
      }
    }
  }

  .touch_msg {
    position: absolute;
    z-index: 6
    ${({ toolTipWidth }) => vw('width', toolTipWidth)}
    ${vw('padding', [25, 30])}
    background: #000;
    opacity: 0.8;
    border-radius: 20px;

    > hr {
      border-color: #444;
      ${vw('margin', [20, 0])}
    }

    > .tooltip_info {
      ${vw('padding', [0, 10])};
      color: #fff;
      ${vw('font-size', 16)};
      font-family: "SamsungSharpSans";
      font-weight: 500;
      font-style: normal;
      text-align: center;
    }

    > .tooltip_video_info {
      ${vw('font-size', 16)};
      font-family: "SamsungSharpSans";
      font-weight: 700;
      font-style: normal;
      ${vw('line-height', 22)}
      text-align: center;
      color: ${({ theme, type }) => theme.smartthings[type].color};
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
    ${vw('bottom', 76)}
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
    ${vw('top', 76)}
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
