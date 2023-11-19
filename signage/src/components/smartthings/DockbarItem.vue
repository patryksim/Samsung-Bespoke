<template>
  <dockbar-wrapper @click="$router.push({ name: 'LandingPage' })">
    <touch-hands :x="340" :y="15"/>
    <div>
      <h2>Tab here to experience more</h2>
      <p>For more information, Contact nearby sales personal</p>
    </div>
  </dockbar-wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import TouchHands from '@stComponents/TouchHands.vue';

const DockbarWrapper = styled('div', { color: String })`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  ${vw('height', 120)};
  background-color: ${({ theme }) => theme.colors.black};
  z-index:2;
  display: flex;
  align-items: center;

  > div {
    ${vw('width', 428)};
    margin: 0 auto;

    > h2{
      width: 100%;
      ${vw('margin-top', 71)};
      color: ${({ theme }) => theme.colors.white};
      ${vw('font-size', 12)};
      text-align: center;
    }

    > p {
      width: 100%;
      ${vw('margin-top', 4)};
      color: ${({ theme }) => theme.colors.white};
      ${vw('font-size', 9)};
      text-align: center;
      opacity: 0.5;
    }
  }
`;
export default {
  components: { DockbarWrapper, TouchHands },
  setup() {
  },
};
</script>
