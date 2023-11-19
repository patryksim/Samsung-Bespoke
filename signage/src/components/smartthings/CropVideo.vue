<template>
  <wrapper v-bind="props">
    <video playsinline="" muted="" class="ready">
      <source :src="src" type="video/mp4">
    </video>
    <loading v-if="loading">Find your pet</loading>
  </wrapper>
</template>

<script>
import { vw } from '@/styles/mixin';
import styled from 'vue3-styled-components';

const baseProps = {
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
};

const Wrapper = styled('div', baseProps)`
  position: absolute;
  overflow: hidden;
  ${({ x, y }) => `
    ${vw('left', x)}
    ${vw('top', y)}
  `}
  ${vw('border-radius', 20)}
  > video {
    ${vw('width', 485)}
  }
`;

const Loading = styled.div`
  position:absolute;
  display:flex;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.8);
  font-size:30px;
  color:white;
  justify-content:center;
  align-items:center;
`;

export default {
  components: { Wrapper, Loading },
  props: baseProps,
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style>

</style>
