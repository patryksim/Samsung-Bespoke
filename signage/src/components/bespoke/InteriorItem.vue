<template>
  <wrapper ref="interiorRef">
    <img :src="item.image.default" :alt="$t(item.i18n)" />
    <p>{{ $t(item.i18n) }}</p>
    <dimd v-show="!selected" />
    <kitchen-type v-if="item.shape">
      <img :src="item.shape.icon" alt="">
      <span>{{ $t(item.shape.i18n) }}</span>
    </kitchen-type>
  </wrapper>
</template>

<script>
import { ref, watchEffect } from 'vue';
import styled from 'vue3-styled-components';
import { vw } from '@styles/mixin';

const Wrapper = styled.div`
  position: relative;
  ${vw('padding', [32, 32, 0])}
  color: ${({ theme }) => theme.colors.white};
  & > img {
    max-width: 100%;
  }
  & > p {
    text-align: center;
    ${vw('font-size', 24)}
    ${vw('margin-top', 8)}
  }
`;

const Dimd = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const KitchenType = styled.div`
  position: absolute;
  ${vw('width', 92)}
  ${vw('height', 80)}
  ${vw('right', 64)}
  ${vw('bottom', 112)}
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  ${vw('line-height', 19.2)}
  & > img {
    max-width: 100%;
    ${vw('margin-bottom', 8)}
  }
  & > span {
    ${vw('font-size', 19.2)}
  }
`;

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  components: { Wrapper, KitchenType, Dimd },
  setup(props, context) {
    const interiorRef = ref(null);

    watchEffect(() => {
      if (props.selected) {
        context.emit('selected', interiorRef.value);
      }
    });

    return {
      interiorRef,
    };
  },
};
</script>
