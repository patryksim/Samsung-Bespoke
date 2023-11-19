<template>
  <wrapper>
    <div>
      <img src="/images/smartthings/energy-chart3.png" alt="">
    </div>
  </wrapper>
</template>

<script>
import { vw } from '@/styles/mixin';
import styled from 'vue3-styled-components';

const Wrapper = styled('div', { start: Boolean })`
  > div {
    :nth-child(1) {
      z-index: 1;
      width: 0;
      > img {
        ${vw('min-width', 280)}
      }
    }

    ${({ start }) => start && `
      :nth-child(1) { ${vw('width', 280)} }
    `}
  }
`;

export default {
  components: { Wrapper },
  setup() {
  },
};
</script>
