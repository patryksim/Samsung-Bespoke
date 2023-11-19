<template>
  <base-check-button-wrapper :x="x" :y="y">
    <div>
      <img src="/images/smartthings/tab-icon-energy-saving-checked.svg" alt="" v-show="checked" :class="{checked: checked}">
      <img src="/images/smartthings/tab-icon-energy-saving-checked-not.svg" alt="" v-show="!checked">
    </div>
  </base-check-button-wrapper>
</template>
<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const baseProps = {
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  checked: {
    type: Boolean,
    default: false,
  },
};

const BaseCheckButtonWrapper = styled('div', { ...baseProps })`
  position: absolute;
  ${({ x }) => vw('left', x)}
  ${({ y }) => vw('top', y)}
  > div {
    ${vw('width', 40)}
    ${vw('height', 40)}
    > img {
      width: 100%;
      height: 100%;
    }
    > img.checked {
      opacity: 0;
      animation: opacity 1s forwards;
    }
  }
`;
export default {
  components: { BaseCheckButtonWrapper },
  props: baseProps,
  setup() {
  },
};
</script>
