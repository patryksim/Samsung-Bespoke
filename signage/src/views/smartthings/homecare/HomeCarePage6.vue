<template>
  <end-card-vue
    chapterMenu="homecare"
    chapterTitle="SmartThings Home Care"
    chapterDesc="Monitoring your device with SmartThings Home Care"
    endCardDesc="Supported features can be varied based on the model and region"
    :is-tablet="false"
  >
    <end-card-list>
      <end-card-item class="endcard-icon">
        <div class="airConditioner">
          <div class="airConditioner-item">
            <img src="/images/smartthings/homecare-endcard-airconditioner-icon1.png" alt="" />
          </div>
          <div class="airConditioner-item">
            <img src="/images/smartthings/homecare-endcard-airconditioner-icon2.png" alt="" />
          </div>
        </div>
        Air Conditioner
      </end-card-item>
      <end-card-item class="endcard-icon washer">
        <img src="/images/smartthings/homecare-endcard-washer-icon.png" alt="" />
        Washer
      </end-card-item>
      <end-card-item class="endcard-icon dryer">
        <img src="/images/smartthings/homecare-endcard-dryer-icon.png" alt="" />
        Dryer
      </end-card-item>
      <end-card-item class="endcard-icon fridge">
        <img src="/images/smartthings/homecare-endcard-fridge-icon.png" alt="" />
        Fridge
      </end-card-item>
      <end-card-item class="endcard-icon airDresser">
        <img src="/images/smartthings/homecare-endcard-airdresser-icon.png" alt="" />
        Air dresser
      </end-card-item>
      <end-card-item class="endcard-icon dishWasher">
        <img src="/images/smartthings/homecare-endcard-dishwasher-icon.png" alt="" />
        Dish washer
      </end-card-item>
      <end-card-item class="endcard-icon airPurifier">
        <img src="/images/smartthings/homecare-endcard-airpurifier-icon.png" alt="" />
        Air Purifier
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

    img {
      ${vw('width', 72)}
      ${vw('margin-bottom', 10)}
    }

    > .airConditioner {
      display:flex;

      > .airConditioner-item {
        ${vw('min-width', 165)}
      }
    }
  }
`;

export default {
  components: { EndCardVue, EndCardList, EndCardItem },
  setup() {

  },
};
</script>
