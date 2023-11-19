<template>
  <end-card-vue
    chapterMenu="clothingcare"
    chapterTitle="SmartThings Clothing Care"
    chapterDesc="Keep your clothes pristine with SmartThings Clothing Care"
    :endCardDesc="endCardDesc"
    :longDesc="true"
    :is-tablet="false"
  >
    <end-card-list>
      <end-card-item class="endcard-icon washer">
        <img src="/images/smartthings/clothingcare-endcard-washer-icon.png" alt="" />
        Washer
      </end-card-item>
      <end-card-item class="endcard-icon dryer">
        <img src="/images/smartthings/clothingcare-endcard-dryer-icon.png" alt="" />
        Dryer
      </end-card-item>
      <end-card-item class="endcard-icon airDresser">
        <img src="/images/smartthings/clothingcare-endcard-airdresser-icon.png" alt="" />
        Air Dresser
      </end-card-item>
    </end-card-list>
  </end-card-vue>
</template>

<script>
import { ref } from 'vue';
import { vw } from '@/styles/mixin';
import EndCardVue from '@/components/smartthings/EndCardItem.vue';
import styled from 'vue3-styled-components';

const EndCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${vw('padding', [35, 0, 0])}
`;

const EndCardItem = styled.p`
  ${vw('min-width', 165)}
  ${vw('font-size', 17)}
  font-weight: 500;
  line-height: 1;
  font-family: SamsungSharpSans;
  text-align: center;

  &.endcard-icon {
    ${vw('margin-bottom', 10)}
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      ${vw('width', 72)}
      ${vw('margin-bottom', 10)}
    }
  }
`;

export default {
  components: { EndCardVue, EndCardList, EndCardItem },
  setup() {
    const endCardDesc = ref(`
      From washing to drying you can care your clothing in one ‘Custom cycle’<br/>
      Custom cycle can be created with a Washer-Dryer (or washer-Air Dresser) combination.
    `);

    return {
      endCardDesc,
    };
  },
};
</script>
