<template>
  <div>
    <page-img>
      <end-card-vue
        chapterMenu="clothingcare"
        chapterTitle="SmartThings Clothing Care"
        chapterDesc="Keep your clothes pristine with SmartThings Clothing Care"
        :endCardDesc="endCardDesc"
        :longDesc="true"
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

      <touch-hands
        :x="345" :y="1010" type="clothingcare" @click="movePage('TabClothingCarePageIndex')" color="blue" v-if="$route.query.sc === 'y'"
      />
      <touch-hands
        :x="345" :y="1010" type="clothingcare" @click="movePage('LandingPage')" color="blue" v-if="$route.query.sc !== 'y'"
      />

      <page-link @click="movePage('TabClothingCarePageIndex')" v-if="$route.query.sc === 'y'"></page-link>
      <page-link @click="movePage('LandingPage')" v-if="$route.query.sc !== 'y'"></page-link>
    </page-img>
  </div>
</template>

<script>
import { ref } from 'vue';
import { PageImg, PageLink } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import { vw } from '@/styles/mixin';
import TouchHands from '@stComponents/TouchHands.vue';
import EndCardVue from '@/components/smartthings/EndCardItem.vue';
import styled from 'vue3-styled-components';

const EndCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${vw('padding', [29, 0, 0])}
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
  components: { PageImg, PageLink, TouchHands, EndCardVue, EndCardList, EndCardItem },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const endCardDesc = ref(`
      From washing to drying you can care your clothing in one ‘Custom cycle’<br/>
      Custom cycle can be created with a Washer-Dryer (or washer-Air Dresser) combination.
    `);

    const movePage = (path) => {
      if (route.query.sc === 'y') {
        router.push({ name: path, query: { sc: 'y', index: true } });
      } else {
        router.push({ name: path });
      }
    };

    return {
      movePage,
      endCardDesc,
    };
  },
};
</script>
