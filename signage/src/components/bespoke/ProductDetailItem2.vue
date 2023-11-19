<template>
  <div v-if="item.defaultImage">
    <product-detail-item>
      <div>
        <h3>{{ item.pageIndex }}</h3>
        <product-detail-item-info>
          <h4>{{$t('common.type')}}</h4>
          <div>
            <img :src="item.src || item.defaultImage" alt="" />
            <div>
              <p>{{ $t(item.name) || $(item.title) }}</p>
              <p class="modelcode" v-if="item.modelNumber">({{ item.modelNumber }})</p>
            </div>
          </div>
        </product-detail-item-info>

        <product-detail-item-color v-if="item.modelNumber">
          <h4>{{$t('common.color')}}</h4>
          <div>
            <div>
              <img :src="getColorchip(item.CMF)" :alt="item.CMF" />
              <p>
                <template v-if="item.componentType === 'washer' || item.componentType === 'dryer'">
                  <div>(Control/Body)</div>
                  <br>
                </template>
                {{ $t(item.colorName) }}
              </p>
            </div>
          </div>
        </product-detail-item-color>
      </div>
    </product-detail-item>
  </div>
</template>

<script>
import { vw } from '@/styles/mixin';
import styled from 'vue3-styled-components';

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
    justify-content: flex-start;
    img {
      ${vw('max-height', 60)}
      ${vw('max-width', 70)}
    }
    p {
      ${vw('min-width', 64)}
      ${vw('padding', [1.6, 10])}
      ${vw('font-size', 18)}
      line-height: 1;
      word-break: break-word;
      font-weight: 500;
      :last-child {
        ${vw('font-size', 14.4)}
        white-space: nowrap;
      }
    }
    div:last-child {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: baseline;
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
    > div {
      display: inline-block;
      ${vw('font-size', 13)}
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

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: { ProductDetailItem, ProductDetailItemInfo, ProductDetailItemColor },
  setup(props) {
    const getColorchip = (CMF) => {
      if (!CMF) return null;

      if (Array.isArray(props.item.items)) {
        const [data] = props.item.items.filter((item) => item.CMF === CMF);
        return data.colorChipSrc;
      }

      const items = [];

      Object.values(props.item.items).forEach((item) => {
        item.forEach((data) => items.push(data));
      });

      const [data] = items.filter((item) => item.CMF === CMF);

      return data.colorChipSrc;
    };
    return {
      getColorchip,
    };
  },
};

</script>
