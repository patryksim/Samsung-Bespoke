<template>
  <wrapper>
    <div>
      <header-item-left>
        <span class="icon">{{ prev === true && '&lt;'}}</span>
        <span>{{ prevTitle }}</span>
      </header-item-left>
      <header-item-right>
        <img src="/images/floating-icon-1-open.png" alt="floating-icon" v-if="rightIcon === 'float'"/>
      </header-item-right>
    </div>
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1;

  & > div {
    display: flex;
    justify-contents: space-between;
    ${vw('padding', [10, 15, 0])};
  }
`;

const HeaderItemLeft = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & span {
    ${vw('font-size', 16)};
    line-height: 1;
    color: ${({ theme }) => theme.colors.darkGray};

    &:last-child {
      ${vw('margin-left', 10)};
    }
  }

  & .icon {
    ${vw('font-size', 21)};
  }
`;

const HeaderItemRight = styled.div`
  ${vw('width', 32)};
  ${vw('height', 31)};

  & img {
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
`;

export default {
  props: {
    prev: {
      type: Boolean,
      default: false,
    },
    prevTitle: {
      type: String,
      required: true,
    },
    rightIcon: {
      type: String,
    },
  },
  components: {
    Wrapper,
    HeaderItemLeft,
    HeaderItemRight,
  },
  setup() {
  },
};
</script>
