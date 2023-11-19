<template>
  <wrapper>
    <step-indicator
      title="landing.bespokeMyHome"
      :step="4"
      :paddingBottom="true"
      :qrcode="true"
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
    <preview-wrapper>
      <div>
        <ul>
          <li v-for="(item, key) in productModelList" :key="key">
            <product-detail-item v-if="item.componentType === 'fridge'" :item="item" :key="key"></product-detail-item>
            <product-detail-item2 v-else :item="item" :key="`1-${key}`"></product-detail-item2>
          </li>
        </ul>
        <span v-if="totalPage > 1">{{ page }} / {{ totalPage }}</span>
      </div>
      <span>{{ $t('preview.description') }}</span>
    </preview-wrapper>
  </wrapper>
</template>

<script>
import ProductDetailItem from '@/components/bespoke/ProductDetailItem.vue';
import ProductDetailItem2 from '@/components/bespoke/ProductDetailItem2.vue';
import { useGetters, useState } from '@/store/helper';
import styled from 'vue3-styled-components';
import StepIndicator from '@/components/bespoke/StepIndicator.vue';
import { InteriorProductPosition } from '@/styles/bespoke/common';
import FridgeContainer from '@/components/bespoke/FridgeContainer.vue';
import ProductContainer from '@/components/bespoke/ProductContainer.vue';
import { vw } from '@/styles/mixin';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
`;

const PreviewWrapper = styled.div`
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
    color: ${({ theme }) => theme.colors.white};
    ${vw('font-size', 16)}
    position: absolute;
    width: 100%;
    text-align: center;
    ${vw('bottom', 80)}
  }
`;

export default {
  components: {
    Wrapper,
    ProductDetailItem,
    PreviewWrapper,
    StepIndicator,
    InteriorProductPosition,
    FridgeContainer,
    ProductContainer,
    ProductDetailItem2,
  },
  setup() {
    const { selectedInterior, productItemList, productModelList } = useGetters();
    const { page, totalPage, fridges } = useState();
    const getIndex = (idx) => {
      const pageIdx = (page.value - 1) * 3;

      return idx + pageIdx;
    };

    return {
      selectedInterior,
      productItemList,
      productModelList,
      page,
      totalPage,
      fridges,
      getIndex,
    };
  },
};
</script>
