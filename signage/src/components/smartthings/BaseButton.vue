<template>
  <button-wrapper>
    <button :class="buttonStyle">
      <slot></slot>
    </button>
  </button-wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const ButtonWrapper = styled('div', { color: String })`
  position: relative;
  ${vw('padding', 60)};
  ${vw('padding', [0, 32])}
  color: ${({ theme }) => theme.colors.white};
  background: none;
  text-align: center;
  & button{
    width: 49%;
    ${vw('height', 60)};
    ${vw('font-size', 25)};
    color: white;
    border: none;
    ${({ color, theme }) => color && `
      background-color: ${theme.colors[color]};
    `}
    ${vw('border-radius', 30)};
    &.small {
      width: 20%;
    }
    &.medium {
      width: 50%;
    }
    &.large {
      width: 100%;
    }
  }
`;
export default {
  props: {
    buttonStyle: {
      type: String,
      default: '',
    },
  },
  components: { ButtonWrapper },
  setup() {
  },
};
</script>
