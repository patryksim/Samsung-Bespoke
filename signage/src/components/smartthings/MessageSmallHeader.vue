<template>
  <wrapper>
    <div>
      <span class="title">{{title}}</span>
      <span>{{subTitle}}</span>
    </div>
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  ${vw('width', 518)};
  background-color: rgba(0,0,0,0.7);
  color: #fff;
  font-family: SamsungSharpSans;
  font-weight: 500;

  > div {
    text-align: center;
    width: 100%;

    span ~ span:before {
      content: '-';
      ${vw('margin', [0, 4])};
      ${vw('font-size', 12)};
      line-height: 2;
    }
  }
  span {
    ${vw('font-size', 12)};
    line-height: 2;
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
