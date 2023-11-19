<template>
  <div class="fridge">
    <div v-for="(item, key) in fridges" :key="key" :class="['door-'+(item.doorLength), { 'door-slim': item.addionalType === 'Slim' }]">
      <img :src="item.src" :alt="item.fridgeName">
      <ul>
        <li v-for="(door, dkey) in item.doorList" :key="dkey">
          <img v-if="door && door.panelSrc" :src="door.panelSrc" :alt="door.colorName">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    fridges: {
      type: Array,
      default: () => [],
    },
  },
};

</script>
