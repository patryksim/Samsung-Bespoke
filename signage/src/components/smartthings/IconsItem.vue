<template>
  <icons-item :x="x" :y="y">
    <div>
      <div>
        <img src="/images/smartthings/43inch-cooking-icon1.png" alt="cooking-icon">
      </div>
      <div>
        <img src="/images/smartthings/43inch-cooking-icon2.png" alt="cooking-icon">
      </div>
    </div>
    <div></div>
  </icons-item>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const IconsItem = styled.div`
  position: absolute;
  ${({ x }) => vw('left', x)};
  ${({ y }) => vw('top', y)};

  > div:first-child {
    > div {
      ${vw('width', 40)};
      ${vw('height', 40)};
      background-color: ${({ theme }) => theme.colors.lightTransparentWhite};
      border-radius: 50%;
      display: flex;
      align-items: center;
      :not(:first-child) {
        ${vw('margin-top', 7)};
      }
      > img {
        width: 60%;
        height: 60%;
        margin: 0 auto;
      }
    }
  }
  > div:last-child {
    position: absolute;
    ${vw('top', 20)};
    ${vw('left', -60)};
    ${vw('width', 60)};
    border-top: 1px solid ${({ theme }) => theme.colors.white};
    &:after {
      content: '';
      position: absolute;
      ${vw('top', -28)};
      ${vw('left', -8)};
      ${vw('width', 1)};
      ${vw('height', 30)};
      background: ${({ theme }) => theme.colors.white};
      transform: rotate(-25deg);
    }
    &:before {
      content: '';
      position: absolute;
      ${vw('top', -28)};
      ${vw('left', -17)};
      ${vw('width', 10)};
      ${vw('height', 10)};
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.white};
    }
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
  },
  components: { IconsItem },
  setup() {
    return {
      IconsItem,
    };
  },
};
</script>
