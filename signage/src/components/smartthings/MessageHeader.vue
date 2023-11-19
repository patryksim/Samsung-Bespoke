<template>
  <wrapper>
    <div>
      <p class="title">{{title}}</p>
      <p>{{subTitle}}</p>
    </div>
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const Wrapper = styled.div`
  display:flex;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  ${vw('width', 518)};
  ${vw('height', 65)};
  ${vw('padding', [13, 0])};
  background-color: rgba(0,0,0,0.8);
  color: #fff;
  font-family: SamsungSharpSans;
  font-weight: 500;
  flex-direction: column;
  justify-content: center;
  z-index: 101;

  > div {
    text-align: center;
    width: 100%;
  }
  p {
    ${vw('font-size', 21)};
    line-height: 1.4;
    letter-spacing: .01em;
  }
  .title {
    font-weight: 700;
  }
`;

export default {
  components: { Wrapper },
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>
