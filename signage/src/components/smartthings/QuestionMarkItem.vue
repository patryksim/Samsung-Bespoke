<template>
  <home-care>
    <question-mark-item :x="x" :y="y" :class="open?'block':'opacity'">
      <div>
        <img src="/images/smartthings/icon-question-mark.png" alt="savemode-img">
      </div>
    </question-mark-item>
  </home-care>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const HomeCare = styled.div`
  .block {
    display: block !important;
  }

  .opacity {
    animation: opacity 2.5s forwards;
  }
`;

const QuestionMarkItem = styled.div`
  position: absolute;
  ${({ x }) => vw('left', x)};
  ${({ y }) => vw('top', y)};
  ${vw('width', 70)};
  ${vw('height', 70)};

  > div {
    > img {
      width: 100%;
      height: 100%;
    }
  }

  @keyframes opacity {
    0% {
      opacity: 1;
    }
    30% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
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
    open: {
      type: Boolean,
      default: true,
    },
  },
  components: { QuestionMarkItem, HomeCare },
  setup() {
    return {
      QuestionMarkItem,
    };
  },
};
</script>
