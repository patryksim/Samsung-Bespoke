<template>
  <wrapper>
    <slide-banner />
  </wrapper>
</template>

<script>
import SlideBanner from '@/components/smartthings/SlideBanner.vue';
import styled from 'vue3-styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
`;

export default {
  components: { SlideBanner, Wrapper },
  setup() {

  },
};
</script>
