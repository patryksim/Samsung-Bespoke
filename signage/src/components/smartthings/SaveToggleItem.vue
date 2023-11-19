<template>
  <save-toggle-item :x="x" :y="y" :save="save">
    <p v-if="!save">Off</p>
    <p v-if="save">On</p>
  </save-toggle-item>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const SaveToggleItem = styled('div', { save: Boolean })`
  position: absolute;
  ${vw('width', 520)};
  ${vw('height', 95)};
  ${({ y }) => vw('top', y)};
  ${({ x }) => vw('left', x)};
  background-color: ${({ theme }) => theme.smartthings.energy.gray};
  ${vw('border-radius', 50)};
  z-index:3;
  display: flex;
  align-items: center;
  ${({ theme, save }) => save && `
    background-color: ${theme.colors.pastelBlue};
  `};
  > p {
    ${vw('margin-left', 35)}
    ${vw('font-size', 25)}
    font-family: 'Roboto';
    color: ${({ theme }) => theme.smartthings.energy.darkGray};
    line-height: 1;
    ${({ theme, save }) => save && `
      color: ${theme.colors.lightBlue};
    `};
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
    save: {
      type: Boolean,
      default: false,
    },
  },
  components: { SaveToggleItem },
  setup() {
    return {
      SaveToggleItem,
    };
  },
};
</script>
