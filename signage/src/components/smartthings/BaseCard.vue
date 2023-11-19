<template>
  <card-wrapper>
    <card-content>
      card data
    </card-content>
    <base-button buttonStyle="medium" color="lightBlue">Save</base-button>
  </card-wrapper>
</template>

<script>
import BaseButton from '@stComponents/BaseButton.vue';
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const CardWrapper = styled.div`
  position: relative;
  ${vw('margin', 20)};
  ${vw('padding', 30)};
  background-color: #333;
  ${vw('border-radius', 40)};
`;

const CardContent = styled.div`
  color: white;
`;

export default {
  components: { CardWrapper, BaseButton, CardContent },
  setup() {
  },
};
</script>
