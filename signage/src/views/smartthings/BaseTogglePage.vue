<template>
  <div>
    <base-toggle v-model="switchValue" />
  </div>
</template>

<script>
import BaseToggle from '@stComponents/BaseToggle.vue';
import { ref } from 'vue';

export default {
  components: { BaseToggle },
  setup() {
    const switchValue = ref(false);

    return {
      switchValue,
    };
  },
};
</script>
