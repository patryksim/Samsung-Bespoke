<template>
  <div>
    <product-detail-item>
      <div>
        <h3>{{ item.pageIndex }}</h3>
        <product-detail-item-info>
          <h4>{{$t('common.type')}}</h4>
          <div>
            <fridge-item>
              <img :src="item.src" alt="" />
              <ul v-if="item.doorList.length > 0" :class="['door-'+item.doorLength]">
                <li v-for="(door, dkey) in item.doorList" :key="dkey">
                  <img v-if="door.panelSrc" :src="door.panelSrc" :alt="door.colorName">
                </li>
              </ul>
            </fridge-item>
            <div>
              <p>{{ $t(item.fridgeName).replace('<br>', ' ') }}</p>
              <p class="modelcode">
                ({{ $t(item.isFixedColor ? (item.doorList[0].fixedCode || item.doorList[0].modelNumber) : item.fridgeModelNumber) }})
              </p>
            </div>
          </div>
        </product-detail-item-info>

        <product-detail-item-color v-if="hasDoor">
          <h4>{{$t('common.color')}}</h4>
          <div>
            <template v-if="item.isFixedColor">
              <div v-for="(door, key) in item.doorList.slice(0, 1)" :key="key">
                <img v-if="door.colorChipSrc" :src="door.colorChipSrc" :alt="door.colorName" />
                <p v-if="door.colorName">
                  <template v-if="item.colorType === 'two-tone'">
                    {{ getTwotonwColor(item.doorList) }}
                  </template>
                  <template v-else>
                    {{ door.colorName }}
                  </template>
                </p>
              </div>
            </template>
            <template v-else>
              <div v-for="(door, key) in item.doorList" :key="key">
                <template v-if="door">
                  <img v-if="door.colorChipSrc" :src="door.colorChipSrc" :alt="door.colorName" />
                  <p>
                    {{ door.colorName && door.colorName }}<br>
                    <span>{{ door.modelNumber }}</span>
                  </p>
                </template>
              </div>
            </template>
          </div>
        </product-detail-item-color>
      </div>
    </product-detail-item>
  </div>
</template>

<script>
import styled from 'vue3-styled-components';
import { computed } from 'vue';
import { vw } from '@styles/mixin';
import { PanelPosition } from '@styles/bespoke/common';

const ProductDetailItem = styled.div`
  width: 100%;
  overflow: hidden;
  font-family: 'SamsungSharpSans';

  & > div {
    display: flex;
    ${vw('padding', [20, 20])}

    & > * {
      ${vw('padding', [0, 3.2])}
    }

    & > h3 {
      width: 5%;
      ${vw('max-width', 100)}
      ${vw('min-width', 16)}
      ${vw('font-size', 16)}
      display: flex;
      align-items: center;
      overflow: hidden;
      font-weight: bold;
    }
  }
`;

const ProductDetailItemInfo = styled.div`
  width: 40%;
  height: 100%;
  font-weight: 500;
  font-weight: bold;
  > h4 {
    ${vw('padding-left', 8)}
    color: #5c5c5c;
    ${vw('font-size', 19.2)}
  }
  > div {
    position: relative;
    display: flex;
    ${vw('padding', [8, 9.6, 0])}
    justify-content: space-between;
    div:last-child {
      display: flex;
      align-items: baseline;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      ${vw('left', 56)}
      top: 50%;
      transform: translateY(-50%);
      p {
        ${vw('min-width', 64)}
        ${vw('padding', [1.6, 10])}
        ${vw('font-size', 18)}
        line-height: 1;
        word-break: break-word;
        font-weight: 500;
        :last-child {
          ${vw('font-size', 14.4)}
        }
      }
    }
  }

`;

const ProductDetailItemColor = styled.div`
  width: 63%;
  margin: 0;
  ${vw('padding-right', 10)}
  font-weight: bold;
  & img {
    ${vw('width', 35)}
    ${vw('height', 35)}
    border-radius: 50%;
  }

  & > h4 {
    ${vw('font-size', 19.2)}
    line-height: 1;
    ${vw('margin', [0, 0, 10])}
    color: #5c5c5c;
  }

  & p {
    ${vw('margin', [0, 10, 0])}
    justify-contents: center;
    ${vw('line-height', 20.8)}
    white-space: nowrap;
    font-weight: 500;
    > span {
      ${vw('font-size', 14.4)}
    }
  }

  & > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    & > div {
      width: 50%;
      display: flex;
      align-items: center;
      ${vw('padding', [5, 0])}
      ${vw('min-height', 41.92)}
      > img {
        ${vw('border', [1.6, 'solid rgba(204, 204, 204, 0.5)'])}
      }
    }
  }
`;

const FridgeItem = styled(PanelPosition)`
  position: relative;

  > img {
    ${vw('height', 80)}
    text-align: center;
  }

  .door-4 {
    li {
      &:nth-of-type(1), &:nth-of-type(2) { top: 0.7%; height: 50.41%; }
      &:nth-of-type(3), &:nth-of-type(4) { bottom: 6.44%; height: 40.1%; }
      &:nth-of-type(1), &:nth-of-type(3) { left: 0%; }
      &:nth-of-type(2), &:nth-of-type(4) { right: 0.2%; }
    }
  }
  .door-2 {
    li:nth-of-type(1) { top: 0.4%; height: 53.5%; }
    li:nth-of-type(2) { bottom: 2.68%; }
  }
  .door-1 {
    li { top: 0.14%; }
  }
`;

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProductDetailItem,
    ProductDetailItemInfo,
    ProductDetailItemColor,
    FridgeItem,
  },
  setup(props) {
    console.log('==================');
    console.log(props.item);
    console.log('==================');
    const hasDoor = computed(() => props.item.doorList.filter((item) => item.modelNumber).length > 0);
    const getTwotonwColor = (doorList) => doorList[0].colorName;

    return {
      hasDoor,
      getTwotonwColor,
    };
  },
};

</script>
