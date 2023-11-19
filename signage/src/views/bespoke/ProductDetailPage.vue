<template>
  <product-wrapper>
    <template v-if="!isProductPreviewGroup">
      <div class="button-right" v-if="rightButton">
        &gt;
      </div>
      <div class="button-left" v-if="leftButton">
        &lt;
      </div>
    </template>
    <product-slider
      v-if="items.length > 0"
      :style="{
        width: isProductPreviewGroup ? '100%' : `${items.length * 100}%`,
        transform: isProductPreviewGroup ? '' : `translateX(-${activeIndex * 100}vw)`
      }"
    >
      <template v-if="isProductPreviewGroup">
        <div class="product">
          <div class="active" style="max-width: 56%;">
            <template v-for="(item, key) in items" :key="`product-grouped-${key}`">
              <img :src="item.src || item.defaultImage" :alt="item.modelNumber" :class="[item.PJT]">
              <template v-if="item.componentType === 'dryer'">
                <div class="dryer-panel-bar" v-if="item.modelNumber">
                  <img
                    :src="`/images/samples/dryer-panel-${item.CMF.split(' ').pop().toLocaleLowerCase()}.png`"
                    :alt="item.modelNumber"
                  >
                </div>
              </template>
              <template v-else-if="item.componentType === 'washer'">
                <div class="washer-shadow" :class="[item.PJT]"></div>
              </template>
            </template>
          </div>
        </div>
      </template>
      <template v-else>
        <template v-for="(item, key) in items">
          <div v-if="item.componentType === 'fridge'" :key="`fridge-${key}`">
            <div :class="{ active: item.active || previewMode }">
              <img :src="item.src" :alt="item.model">
              <ul v-if="item.doorList.length > 0" :class="['door-'+(item.doorLength)]">
                <li v-for="(door, dkey) in item.doorList" :key="`door-${key}-${dkey}`">
                  <img v-if="door && door.panelSrc" :src="door.panelSrc" :alt="door.colorName">
                </li>
              </ul>
            </div>
          </div>
          <div v-else :key="`product-${key}`">
            <div class="product" :class="{ active: item.active }">
              <img
                v-if="isFrontTypeGroup"
                :src="getFrontImageSrc(item.src || item.defaultImage)"
                :alt="item.modelNumber"
                :class="[item.PJT]"
              >
              <img
                v-else
                :src="item.src || item.defaultImage"
                :alt="item.modelNumber"
                :class="[item.PJT]"
              >
            </div>
          </div>
        </template>
      </template>
    </product-slider>
    <select-interior v-else-if="selectedInterior">
        <h3>{{$t('step.chooseYourProduct')}}</h3>
        <img :src="selectedInterior.image.default" :alt="selectedInterior.name">
        <p>{{ selectedInterior.name }}</p>
    </select-interior>
  </product-wrapper>
</template>

<script>
import styled, { css } from 'vue3-styled-components';
import { PanelPosition } from '@/styles/bespoke/common';
import { useGetters, useState } from '@/store/helper';
import { watch, ref, computed } from 'vue';
import { vw } from '@styles/mixin';

const ButtonStyle = css`
    border-radius: 50%;
    position: absolute;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.black};
    ${vw('font-size', 40)}
    ${vw('line-height', 64)}
    text-align: center;
    top: 50%;
    opacity: 0.5;
`;

const ProductWrapper = styled(PanelPosition)`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray};
  .button-right {
    ${ButtonStyle}
    ${vw('right', 10)}
  }
  .button-left {
    ${ButtonStyle}
    ${vw('left', 10)}
  }
`;

const ProductSlider = styled.div`
  display: flex;
  transition: transform .5s;
  > div {
    animation: productFadeIn .5s;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &.product {
      img {
        display: block;
        max-width: 100%;
      }

      > div {
        width: 90%;
      }
    }

    > div {
      position: relative;
      opacity: 0.3;
      transition: .3s;
      text-align: center;

      &.active {
        opacity: 1;
      }

      &.product {
        > img {
          max-width: 90%;
        }
      }

      > img {
        max-height: 92vh;
        position: relative;
        ${vw('top', -16)}
      }

      .dryer-panel-bar {
        position: relative;
        ${vw('margin-top', -45)}
        > img {
          ${vw('width', 645)}
        }
      }

      .washer-shadow {
        background: linear-gradient(#343434,#1d1d1d 23%,transparent);
        position: relative;
        width: 100%;
        ${vw('height', 15)}
        ${vw('top', -33)}
        ${vw('border-bottom-left-radius', 15)}
        ${vw('border-bottom-right-radius', 15)}
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
`;

const SelectInterior = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  font-family: 'SamsungSharpSans';
  animation: productFadeIn .5s;
  > h3 {
    ${vw('font-size', 48)}
    ${vw('padding', [92.8, 0, 96])}
    font-weight: bold;
  }
  > img {
    max-width: 100%;
  }
  > p {
    ${vw('font-size', 32)}
    ${vw('padding-top', 32)}
  }
`;

export default {
  components: { ProductWrapper, ProductSlider, SelectInterior },
  setup() {
    const {
      productModelDetail,
      selectedInterior,
      isProductPreviewGroup,
      isFrontTypeGroup,
    } = useGetters();
    const { previewMode } = useState();
    const leftButton = ref(false);
    const rightButton = ref(false);
    const activeIndex = computed(() => {
      const index = productModelDetail.value.findIndex((item) => item.active);
      return index < 0 ? 0 : index;
    });

    const getFrontImageSrc = (src) => (src ? src.replace('.png', '-front.png') : '');

    watch(activeIndex, (newIndex) => {
      if (!productModelDetail.value.length) {
        rightButton.value = false;
        leftButton.value = false;

        return;
      }

      rightButton.value = productModelDetail.value.length !== newIndex + 1;
      leftButton.value = newIndex !== 0;
    });

    return {
      items: productModelDetail,
      rightButton,
      leftButton,
      selectedInterior,
      activeIndex,
      isProductPreviewGroup,
      isFrontTypeGroup,
      getFrontImageSrc,
      previewMode,
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
