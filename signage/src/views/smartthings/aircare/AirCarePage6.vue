<template>
  <end-card-vue
    chapterMenu="aircare"
    chapterTitle="SmartThings Air Care"
    chapterDesc="Make home fresher with SmartThings Air Care"
    :is-tablet="false"
  >
    <end-card-list>
      <end-card-item class="endcard-icon">
        <img src="/images/smartthings/aircare-endcard-airpurifier-icon.png" alt="" />
        <h2>Air Purifier</h2>
        <p>
          Sensing indoor air quality and<br />
          purifying automatic ally when indoor air is not good
        </p>
      </end-card-item>
    </end-card-list>
  </end-card-vue>
</template>

<script>
import { vw } from '@/styles/mixin';
import EndCardVue from '@/components/smartthings/EndCardItem.vue';
import styled from 'vue3-styled-components';

const EndCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${vw('padding', [15, 0, 0])}
`;

const EndCardItem = styled.p`
  ${vw('min-width', 165)}
  ${vw('font-size', 17)}
  font-weight: 500;
  line-height: 1;
  font-family: SamsungSharpSans;
  text-align: center;

  &.endcard-icon {
    ${vw('margin-bottom', 30)}
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
      ${vw('margin-top', 8)}
      color: #1d1d1b;
      ${vw('font-size', 14)}
      line-height: 1.44;
      letter-spacing: -0.01em;
      opacity: 0.5;
    }

    img {
      ${vw('width', 72)}
      ${vw('margin-bottom', 10)}
    }
  }
`;

export default {
  components: { EndCardVue, EndCardList, EndCardItem },
  setup() {
  },
};
</script>
