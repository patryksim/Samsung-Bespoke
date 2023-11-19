<template>
  <signage-page
    src="/images/smartthings/cooking-1.png"
    header="SmartThings Cooking"
    footer="ME-FIT cooking"
  >
    <icons-item :x="300" :y="140" v-show="showIconRef"/>
  </signage-page>
</template>

<script>
import SignagePage from '@/components/smartthings/SignagePage.vue';
import socket from '@/api/socket';
import IconsItem from '@stComponents/IconsItem.vue';
import { ref } from 'vue';

export default {
  components: { SignagePage, IconsItem },
  setup() {
    const showIconRef = ref(false);
    socket.on('turnOnHood', () => {
      showIconRef.value = true;
    });
    return {
      showIconRef,
    };
  },
};
</script>
