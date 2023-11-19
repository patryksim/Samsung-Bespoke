<template>
  <wrapper v-bind="props">
    <div class="content">
      <div>{{ header }}</div>
      <div v-html="footer"></div>
    </div>
    <div class="video">
      <div v-show="play && src || !src">
        <video v-if="videoSrc" playsinline="" :muted="muted" class="ready" :autoplay="autoplay" :loop="autoplay">
          <source :src="videoSrc" type="video/mp4">
        </video>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </wrapper>
</template>

<script>

import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const baseProps = {
  src: {
    type: String,
    default: null,
  },
  videoSrc: {
    type: String,
    default: null,
  },
  header: {
    type: String,
    default: '',
  },
  footer: {
    type: String,
    default: '',
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  muted: {
    type: Boolean,
    default: true,
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
  play: {
    type: Boolean,
    default: false,
  },
};

const Wrapper = styled('div', baseProps)`
  width: 100vw;
  height: 100vh;
  ${({ src, theme }) => (src ? `
    background: url(${src}) center / cover;
  ` : `
    background: ${theme.colors.black};
  `)}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  ${vw('padding', [60, 0, 80])}
  > .content {
    position:relative;
    z-index:1;

    > div {
      :nth-child(1),
      :nth-child(2) {
        color: ${({ theme }) => theme.colors.white};
        font-family: 'SamsungSharpSans';
        text-align: center;
      }
      :nth-child(1) {
        ${vw('font-size', 42)}
        font-weight: 700;
        text-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      }
      :nth-child(2) {
        ${vw('height', 115)}
        ${vw('margin-top', 20)}
        ${vw('font-size', 32)}
        font-weight: 400;
        ${vw('line-height', 42)}
        text-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      }
    }
  }

  > .video {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${({ fullScreen }) => fullScreen && `
      position:absolute;
      top:50%;
      transform:translateY(-50%);
    `}

    > div {
      position: relative;
      > video {
        max-width: 100%;
      }
    }
  }
`;

export default {
  props: baseProps,
  components: { Wrapper },
  setup(props) {
    return {
      props,
    };
  },
};
</script>
