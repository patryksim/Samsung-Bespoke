<template>
  <landing-item>
    <description>
      <h1>{{ $t('landing.bespokeMyHome') }}</h1>
      <p>{{ $t('landing.designyourown') }}</p>
      <div class="tab">
        <img src="/images/touch-the-tab.png" alt="touch-the-tab">
      </div>
    </description>
    <video playsinline="" :muted="muted" class="ready" autoplay loop>
        <!-- <source src="/videos/BESPOKE Global_Emerging_EU_Color_15s_9x16.mp4" type="video/mp4"> -->
        <source src="/videos/BESPOKE Global_Emerging_EU_Color_15s_9x16_low.mp4" type="video/mp4">
    </video>
  </landing-item>
</template>

<script>
import styled from 'vue3-styled-components';
import { ref } from 'vue';
import { vw } from '@styles/mixin';

const landingItem = styled.div`
  position: fixed;
  overflow: hidden;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const description = styled.div`
  position: absolute;
  width: 100%;
  ${vw('top', 88)}
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'SamsungSharpSans';
  > h1 {
    ${vw('font-size', 48)}
    font-weight: bold;
    font-family: 'SamsungSharpSans';
  }
  > p {
    ${vw('margin', [51.2, 24])}
    ${vw('font-size', 19.2)}
    font-weight: bold;
  }
  .tab {
    display: inline-block;
    position: relative;
    > img {
      ${vw('width', 89.6)}
    }
    :before {
      content: '';
      display: inline-block;
      ${vw('width', 48)}
      ${vw('height', 48)}
      background-image: url('/images/touch-ring.png');
      background-repeat: no-repeat;
      background-size: 60%;
      position: absolute;
      ${vw('right', -7.2)}
      ${vw('bottom', 11.2)}
      animation: touch 1.5s;
      animation-iteration-count: infinite;
      animation-direction: forward;
    }
  }
`;

export default {
  components: { landingItem, description },
  setup() {
    const muted = ref(true);

    return {
      muted,
    };
  },
};
</script>
