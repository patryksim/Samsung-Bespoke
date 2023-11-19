<template>
  <wrapper>
    <h2>{{title}}</h2>
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const Wrapper = styled('div', { color: String })`
  position: relative;
  z-index: 1;
  ${vw('padding', [0, 35])};
  & h2 {
    ${vw('margin-top', 59)};
    ${vw('font-size', 36)};
    font-weight: 700;
    text-align: center;
    ${({ theme, color }) => color && `
      color: ${theme.colors[color]};
    `}
  }
`;

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  components: { Wrapper },
  setup() {
  },
};
</script>
