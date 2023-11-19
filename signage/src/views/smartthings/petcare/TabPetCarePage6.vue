<template>
  <div>
    <page-img>
      <end-card-vue
        chapterMenu="petcare"
        chapterTitle="SmartThings Pet Care"
        chapterDesc="SmartThings Pet care Care for your pets"
      >
        <end-card-list>
          <end-card-item class="endcard-icon jetBotAI">
            <img src="/images/smartthings/petcare-endcard-jetbotai-icon.png" alt="" />
            <div class="petcare-item">
              <h2>Jet Bot AI+</h2>
              <p>
                Set to monitor your Pet at<br />
                Designated area & time
              </p>
            </div>
          </end-card-item>
          <end-card-item class="endcard-icon airConditioner">
            <img src="/images/smartthings/petcare-endcard-airconditioner-icon.png" alt="" />
            <div class="petcare-item">
              <h2>Air Conditioner</h2>
              <p>
                Adjust temperature<br />
                depending on the length<br />
                of  your pet’s fur
              </p>
            </div>
          </end-card-item>
          <end-card-item class="endcard-icon airPurifier">
            <img src="/images/smartthings/petcare-endcard-airpurifier-icon.png" alt="" />
            <div class="petcare-item">
              <h2>Air Purifier</h2>
              <p>
                Help remove pet hair and<br />
                odors from the air
              </p>
            </div>
          </end-card-item>
        </end-card-list>
      </end-card-vue>
      <touch-hands
        :x="345" :y="1010" type="petcare" @click="movePage('TabPetCarePageIndex')" color="blue" v-if="$route.query.sc === 'y'"
      />
      <touch-hands
        :x="345" :y="1010" type="petcare" @click="movePage('LandingPage')" color="blue" v-if="$route.query.sc !== 'y'"
      />
      <page-link @click="movePage('TabPetCarePageIndex')" v-if="$route.query.sc === 'y'"></page-link>
      <page-link @click="movePage('LandingPage')" v-if="$route.query.sc !== 'y'"></page-link>
    </page-img>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { PageImg, PageLink } from '@/styles/smartthings/common';
import { vw } from '@/styles/mixin';
import TouchHands from '@stComponents/TouchHands.vue';
import EndCardVue from '@/components/smartthings/EndCardItem.vue';
import styled from 'vue3-styled-components';

const EndCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${vw('padding', [29, 40, 0, 80])}
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
    flex-direction: row;
    align-items: center;

    .petcare-item {
      ${vw('margin-left', 20)}
      text-align: left;

      > p {
        ${vw('margin-top', 8)}
        color: #1d1d1b;
        ${vw('font-size', 14)}
        line-height: 1.44;
        letter-spacing: -0.01em;
        opacity: 0.5;
      }
    }

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
