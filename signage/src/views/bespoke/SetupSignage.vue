<template>
  <wrapper>
    <h1>How to connect</h1>
    <step-content>
      <h2>Step 1</h2>
      <p>Open second screen application in tablet</p>
      <div>
        <img src="/images/how-to-connect-1.jpg" alt="">
        <img src="/images/how-to-connect-2.jpg" alt="">
      </div>
    </step-content>
    <step-content>
      <h2>Step 2</h2>
      <p>Connected Signage Screen</p>
      <div>
        <img src="/images/how-to-connect-3.jpg" alt="">
        <img src="/images/how-to-connect-4.jpg" alt="">
      </div>
    </step-content>
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const Wrapper = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-family: 'SamsungSharpSans';
  font-weight: bold;
  > h1 {
    ${vw('padding', [82, 0, 56])}
    ${vw('font-size', 52)}
  }
`;

const StepContent = styled.div`
  text-align: left;
  ${vw('margin-bottom', 62)}
  ${vw('padding', [0, 40])}
  > h2 {
    ${vw('font-size', 32)}
    ${vw('margin-bottom', 15)}
  }
  > p {
    ${vw('font-size', 18)}
    font-weight: 500;
  }
  > div {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${vw('margin-top', 20)}
    img {
      width: 48%;
      ${vw('border-radius', 10)}
    }
    :before {
      content: '>';
      display: inline-block;
      position: absolute;
      ${vw('font-size', 28)}
      font-weight: normal;
      font-family: 'SamsungOne';
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export default {
  components: { Wrapper, StepContent },
  setup() {
  },
};
</script>
