<template>
  <wrapper>
    <base-header :prev="true" prevTitle="Pet care" rightIcon="float"></base-header>
  </wrapper>
</template>

<script>
import BaseHeader from '@/components/smartthings/BaseHeader.vue';
import styled from 'vue3-styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
`;

export default {
  components: { BaseHeader, Wrapper },
  setup() {

  },
};
</script>
