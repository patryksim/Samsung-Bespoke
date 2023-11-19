<template>
  <page-side>
    <img :src="`/images/smartthings/${type}_side.png`" alt="sideImg"/>
  </page-side>
</template>

<script>
import { PageSide } from '@/styles/smartthings/common';

export default {
  components: { PageSide },
  props: {
    type: {
      type: String,
    },
  },
  setup() {
  },
};
</script>
