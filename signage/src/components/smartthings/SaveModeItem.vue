<template>
  <save-mode-item :x="x" :y="y">
    <div>
      <img src="/images/smartthings/tab-icon-save-mode.svg" alt="savemode-img">
    </div>
  </save-mode-item>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const SaveModeItem = styled.div`
  position: absolute;
  ${({ x }) => vw('left', x)};
  ${({ y }) => vw('top', y)};
  > div {
    ${vw('width', 70)}
    ${vw('height', 70)}
    background-color: ${({ theme }) => theme.colors.darkTransparentWhite};
    border-radius: 50%;
    display: flex;
    align-items: center;
    > img {
      width: auto;
      height: auto;
      margin: 0 auto;
    }
  }
`;

export default {
  props: {
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
  components: { SaveModeItem },
  setup() {
    return {
      SaveModeItem,
    };
  },
};
</script>
