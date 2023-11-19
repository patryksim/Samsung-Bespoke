<template>
  <wrapper v-bind="props">
    <line-chart v-if="type === 'line'" :start="start" :save="save"/>
    <bar-chart v-if="type === 'bar'" :start="start"/>
  </wrapper>
</template>

<script>
import { vw } from '@/styles/mixin';
import styled from 'vue3-styled-components';
import LineChart from '@stComponents/animate/LineChart.vue';
import BarChart from '@stComponents/animate/BarChart.vue';

const baseProps = {
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  start: {
    type: Boolean,
    required: true,
    default: false,
  },
  type: {
    type: String,
    default: 'line',
  },
  save: {
    type: Boolean,
    default: false,
  },
};

const Wrapper = styled('div', baseProps)`
  position: absolute;
  ${({ x, y }) => `
    ${vw('left', x)}
    ${vw('top', y)}
  `}
  > div {
    display: flex;
    > div {
      overflow: hidden;
      transition: 1s all;
      position: relative;

      ${({ save }) => save && `
        transition: 0s all;
        transition-delay: 0s;
      `}
    }
  }
`;

export default {
  components: { Wrapper, LineChart, BarChart },
  props: baseProps,
  setup(props) {
    return {
      props,
    };
  },
};
</script>
