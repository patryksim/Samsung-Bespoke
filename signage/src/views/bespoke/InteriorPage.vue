<template>
  <wrapper>
    <landing-item v-if="randing" />
    <step-indicator
      title="step.chooseYourInterior"
      :step="1"
    />
    <interior-wrapper ref="interiorRef">
      <div v-for="(item, key) in interiorList" :key="key">
        <interior-item
          :style="!key && 'padding-top: 0'"
          :selected="key === interior"
          :item="item"
          @selected="moveSelectInterior"
        ></interior-item>
      </div>
    </interior-wrapper>
  </wrapper>
</template>

<script>
import InteriorItem from '@/components/bespoke/InteriorItem.vue';
import LandingItem from '@/components/bespoke/LandingItem.vue';
import { ref, watch } from 'vue';
import { useState, useMutations } from '@/store/helper';
import styled from 'vue3-styled-components';
import StepIndicator from '@/components/bespoke/StepIndicator.vue';
import { vw } from '@styles/mixin';

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
`;

const InteriorWrapper = styled.div`
  ${vw('padding-bottom', 32)}
`;

export default {
  components: { InteriorItem, LandingItem, Wrapper, InteriorWrapper, StepIndicator },
  setup() {
    const { interior, interiorScroll, randing, interiorList } = useState();
    const { setInterior } = useMutations();
    const interiorRef = ref(null);

    const moveSelectInterior = (data) => {
      if (!data) return;

      const { offsetTop, offsetHeight } = data.$el;

      window.scrollTo({
        top: offsetTop - (window.innerHeight / 2) + (offsetHeight / 2),
        behavior: 'smooth',
      });
    };

    watch(interior, (newIdx) => {
      setInterior(newIdx);
    });

    watch(interiorScroll, (newIdx) => {
      const { scrollHeight } = interiorRef.value.$el;

      window.scrollTo(0, scrollHeight * newIdx);
    });

    return {
      interiorList,
      interior,
      randing,
      moveSelectInterior,
      interiorRef,
    };
  },
};
</script>

<style></style>
