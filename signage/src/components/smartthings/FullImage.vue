<template>
  <wrapper>
    <router-link :to="imgLink">
      <!-- <img :src="imgLink" alt="" /> -->
    </router-link>
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';

const Wrapper = styled.div`
  & img {
    height: 100vh;
    position:relative;
    left:50%;
    transform:translateX(-50%);
  }
`;

export default {
  props: {
    routorLink: {
      type: String,
      default: '',
    },
    imgLink: {
      type: String,
    },
  },
  components: { Wrapper },
  setup() {
  },
};
</script>
