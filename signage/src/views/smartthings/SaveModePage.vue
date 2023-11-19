<template>
  <wrapper>
    <save-mode-item />
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import SaveModeItem from '@stComponents/SaveModeItem';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
`;

export default {
  components: { SaveModeItem, Wrapper },
  setup() {

  },
};
</script>
