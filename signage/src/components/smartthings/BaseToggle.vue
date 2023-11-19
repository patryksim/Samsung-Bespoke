<template>
  <toggle-wrapper :x="x" :y="y">
    <toggle-box :initValue="initValue">
      <toggle-circle></toggle-circle>
    </toggle-box>
  </toggle-wrapper>
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
  initValue: {
    type: Boolean,
    default: '',
  },
};

const ToggleWrapper = styled('div', { ...baseProps })`
  position: absolute;
  z-index: 5;
  ${({ y }) => vw('top', y)}
  ${({ x }) => vw('left', x)}
  display: flex;
  ${vw('margin-top', 10)};
`;

const ToggleBox = styled('div', { initValue: Boolean })`
    display: flex;
    align-items: center;
    ${vw('width', 60)};
    ${vw('height', 30)};
    ${vw('border-radius', 20)};
    background:${({ theme }) => theme.colors.lightGray};
    transition: all 0.5s;
    ${({ initValue, theme }) => initValue && `
      ${vw('width', 60)};
      ${vw('height', 30)};
      background: ${theme.colors.toggleBlue};
      justify-content: flex-end;
    `};
`;

const ToggleCircle = styled.div`
    ${vw('width', 32)};
    ${vw('height', 32)};
    ${vw('border-radius', 100)};
    border: 2px solid #0381fe;
    background:${({ theme }) => theme.colors.white};
`;

export default {
  components: { ToggleWrapper, ToggleBox, ToggleCircle },
  props: baseProps,
  setup() {
  },
};
</script>
