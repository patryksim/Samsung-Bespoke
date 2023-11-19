<template>
  <div>
    <page-img>
      <end-card-vue
        chapterMenu="cooking"
        chapterTitle="SmartThings Cooking"
        chapterDesc="More enjoyable cooking with SmartThings Cooking"
        endCardDesc="Supported features can be varied based on the model and region"
      >
        <end-card-list>
          <end-card-item class="endcard-icon familyHub">
            <img src="/images/smartthings/cooking-endcard-familyhub-icon.png" alt="" />
            Family hub
          </end-card-item>
          <end-card-item class="endcard-icon range">
            <img src="/images/smartthings/cooking-endcard-range-icon.png" alt="" />
            Range
          </end-card-item>
          <end-card-item class="endcard-icon oven">
            <img src="/images/smartthings/cooking-endcard-oven-icon.png" alt="" />
            Oven
          </end-card-item>
          <end-card-item class="endcard-icon cooktop">
            <img src="/images/smartthings/cooking-endcard-cooktop-icon.png" alt="" />
            Cooktop
          </end-card-item>
          <end-card-item class="endcard-icon mwo">
            <img src="/images/smartthings/cooking-endcard-mwo-icon.png" alt="" />
            MWO
          </end-card-item>
        </end-card-list>
      </end-card-vue>

      <touch-hands
        :x="345" :y="1010" type="cooking" @click="movePage('TabCookingPageIndex')" color="blue" v-if="$route.query.sc === 'y'"
      />
      <touch-hands
        :x="345" :y="1010" type="cooking" @click="movePage('LandingPage')" color="blue" v-if="$route.query.sc !== 'y'"
      />
      <page-link @click="movePage('TabCookingPageIndex')" v-if="$route.query.sc === 'y'"></page-link>
      <page-link @click="movePage('LandingPage')" v-if="$route.query.sc !== 'y'"></page-link>
    </page-img>
  </div>
</template>

<script>
import { vw } from '@/styles/mixin';
import { PageImg, PageLink } from '@/styles/smartthings/common';
import { useRouter, useRoute } from 'vue-router';
import TouchHands from '@stComponents/TouchHands.vue';
import EndCardVue from '@/components/smartthings/EndCardItem.vue';
import styled from 'vue3-styled-components';

const EndCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${vw('padding', [29, 40, 0])}
`;

const EndCardItem = styled.p`
  ${vw('min-width', 170)}
  ${vw('font-size', 17)}
  font-weight: 500;
  line-height: 1;
  font-family: SamsungSharpSans;
  text-align: center;

  &.endcard-icon {
    ${vw('margin-bottom', 20)}
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

    const movePage = (path) => {
      if (route.query.sc === 'y') {
        router.push({ name: path, query: { sc: 'y', index: true } });
      } else {
        router.push({ name: path });
      }
    };

    return {
      movePage,
    };
  },
};
</script>
