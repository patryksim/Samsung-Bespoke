<template>
  <base-check-button-wrapper :x="x" :y="y">
    <div v-for="(item, index) in checkList" :key="index">
      <img src="/images/smartthings/tab-icon-energy-saving-list-checked.svg" alt="" v-show="checkedAll" :class="{checked: checkedAll}">
      <img src="/images/smartthings/tab-icon-energy-saving-checked-not.svg" alt="" v-show="!checkedAll">
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
  checkedAll: {
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
    ~ div {
      ${vw('margin-top', 41)};
    }
    > img {
      width: 100%;
      height: 100%;
    }
    > img.checked {
      opacity: 0;
      animation: opacity 1s forwards;
    }
    :nth-child(2) > img { animation-delay: .2s; }
    :nth-child(3) > img { animation-delay: .4s; }
    :nth-child(4) > img { animation-delay: .6s; }
    :nth-child(5) > img { animation-delay: .8s; }
  }
`;
export default {
  components: { BaseCheckButtonWrapper },
  props: baseProps,
  setup() {
    const checkList = [false, false, false, false];

    return {
      checkList,
    };
  },
};
</script>
