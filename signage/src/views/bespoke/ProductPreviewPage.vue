<template>
  <product-wrapper>
    <step-indicator
      :title="selectedFridgeColor ? 'step.chooseYourColor' : 'step.chooseYourProduct'"
      :step="isColorSelect ? 3 : 2"
      :paddingBottom="true"
    />
    <interior-product-position :class="[selectedInterior.id]">
      <img :src="selectedInterior.image.default" :alt="selectedInterior.name">
      <fridge-container :fridges="productItemList.fridges" />
      <template v-for="(item, key) in productItemList.product">
        <product-container
          v-if="true"
          :key="key"
          :items="item"
        />
      </template>
    </interior-product-position>
    <detail-wrapper>
      <div>
        <ul>
          <li v-for="(item, key) in productModelList" :key="key">
            <product-detail-item v-if="item.componentType === 'fridge'" :item="item" :key="key"></product-detail-item>
            <product-detail-item2 v-else :item="item" :key="`1-${key}`"></product-detail-item2>
          </li>
        </ul>
        <span v-if="totalPage > 1">{{ page }} / {{ totalPage }}</span>
      </div>
    </detail-wrapper>
  </product-wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import { useGetters, useState } from '@/store/helper';
import { InteriorProductPosition } from '@/styles/bespoke/common';
import ProductDetailItem from '@/components/bespoke/ProductDetailItem.vue';
import ProductDetailItem2 from '@/components/bespoke/ProductDetailItem2.vue';
import StepIndicator from '@/components/bespoke/StepIndicator.vue';
import FridgeContainer from '@/components/bespoke/FridgeContainer.vue';
import ProductContainer from '@/components/bespoke/ProductContainer.vue';

const ProductWrapper = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
`;

const DetailWrapper = styled.div`
  width: 100%;
  height: 100vh;
  > div {
    background: ${({ theme }) => theme.colors.deepGray};
    ${vw('min-height', 496)}
    position: relative;
    > p {
      ${vw('font-size', 48)}
      color: ${({ theme }) => theme.colors.white};
      font-family: 'SamsungSharpSans';
      font-weight: bold;
      ${vw('padding', [96, 32, 80])}
      background-color: ${({ theme }) => theme.colors.black};
      text-align: center;
    }
    > img {
      width: 100%;
    }
    > span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      ${vw('bottom', 20)}
    }
  }
  > span {
    color: ${({ theme }) => theme.colors.black};
    ${vw('font-size', 16)}
    ${vw('right', 16)}
    ${vw('bottom', 16)}
    position: absolute;
  }
`;

export default {
  components: {
    ProductWrapper,
    DetailWrapper,
    ProductDetailItem,
    InteriorProductPosition,
    StepIndicator,
    FridgeContainer,
    ProductContainer,
    ProductDetailItem2,
  },
  setup() {
    const { fridgeArray, selectedInterior, selectedFridgeColor, productItemList, productModelList } = useGetters();
    const { page, totalPage, isColorSelect } = useState();

    const getIndex = (idx) => {
      const pageIdx = (page.value - 1) * 3;

      return idx + pageIdx;
    };

    return {
      fridges: fridgeArray,
      selectedInterior,
      selectedFridgeColor,
      productItemList,
      page,
      totalPage,
      productModelList,
      getIndex,
      isColorSelect,
    };
  },
};
</script>

<style lang="scss">
@keyframes productFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
