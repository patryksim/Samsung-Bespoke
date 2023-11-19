<template>
  <component :is="ProductPosition[items.componentType]">
    <div v-if="items.multiple" :style="`align-items: ${items.items.length > 1 ? 'flex-end' : 'flex-end'}`">
      <div>
        <div
          v-for="(data, key) in items.items"
          :key="key"
          class="product-item"
          :class="[items.items.length < 2 ? data.PJT : '']"
        >
          <img v-if="data && data.defaultImage" :src="data.src || data.defaultImage" alt="">
        </div>
      </div>
    </div>
    <div v-else>
      <div class="product-item" v-if="items.defaultImage" :class="{'small-dw': isSmallDishWasher}">
        <img
          :src="productSrc || items.defaultImage"
          alt=""
          :style="items.type === 'DW_BUILT_IN' && !items.modelNumber && 'height: auto;'"
          :class="[items.PJT, {'small-dw': isSmallDishWasher}]">
        <template v-if="items.componentType === 'dryer'">
          <dryer-panel-bar>
            <img
              :src="`/images/samples/dryer-panel-${items.CMF.split(' ')[1].toLocaleLowerCase()}.png`"
              :alt="items.modelNumber"
            >
          </dryer-panel-bar>
        </template>
        <template v-if="items.componentType === 'washer'">
          <washer-shadow />
        </template>
      </div>
    </div>
  </component>
</template>

<script>
import ProductPosition from '@/styles/bespoke/productPosition';
import styled from 'vue3-styled-components';
import { vw } from '@styles/mixin';
import { ref, computed, watch } from 'vue';

const DryerPanelBar = styled.div`
  position: absolute;
  ${vw('left', 1)}
  ${vw('bottom', -2)}
  ${vw('height', 15)}
  > img {
    max-width: 98.4%;
  }
`;

const WasherShadow = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  background: #525252;
  ${vw('bottom', 1)}
  ${vw('height', 3)}
`;

export default {
  components: { DryerPanelBar, WasherShadow },
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isMultiple = Array.isArray(props.items);
    const checkSmallDishWasher = () => (
      (
        props.items.PJT === 'DW8500AM'
        && props.items.modelNumber
        && props.items.modelNumber.split('').findIndex((data) => data === 'U') === 9)
      || (
        props.items.type === 'DW_BUILT_IN'
        && !props.items.modelNumber
      )
    );
    const isSmallDishWasher = ref(checkSmallDishWasher());
    const productSrc = computed(() => (
      isSmallDishWasher.value && props.items.modelNumber ? props.items.src.replace('.png', '-built-in.png') : props.items.src
    ));

    watch(() => props.items, () => {
      isSmallDishWasher.value = checkSmallDishWasher();
    });
    return {
      isMultiple,
      ProductPosition,
      productSrc,
      isSmallDishWasher,
    };
  },
};

</script>
