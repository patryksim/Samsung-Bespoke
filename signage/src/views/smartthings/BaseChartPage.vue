<template>
  <wrapper>
    <base-chart />
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import BaseChart from '@stComponents/BaseChart.vue';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
`;

export default {
  components: { Wrapper, BaseChart },
  setup() {

  },
};
</script>
