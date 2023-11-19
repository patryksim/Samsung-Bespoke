<template>
  <button-wrapper>
    <div id="tabs">
      <button v-for="(data, key) in tabs" :key="key" :class="{active: currentTab === key}" @click="currentTab = key">
        {{data}}
      </button>
    </div>
    <content-area>
      <tab-content v-show="currentTab === 0">{{content1}}</tab-content>
      <tab-content v-show="currentTab === 1">{{content2}}</tab-content>
    </content-area>
  </button-wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import { ref } from 'vue';

const ButtonWrapper = styled.div`
  position: relative;
  ${vw('padding', 60)};
  padding: 2rem 2rem 0;
  color: ${({ theme }) => theme.colors.white};
  background: none;
  & button{
    width:49%;
    ${vw('height', 60)};
    ${vw('font-size', 33)};
    ${vw('border-radius', 30)};
    &.active{
      border:1px solid black;
      font-weight: 700;
    }
  }
  #tabs{
    display:flex;
    justify-content: space-between;
    ${vw('padding-bottom', 15)};
  }
`;
export default {
  components: { ButtonWrapper },
  setup() {
    const currentTab = ref(0);

    return {
      currentTab,
      tabs: ['Find on map', 'Find manually'],
      tab: 'Find on map',
      content1: 'dummy1',
      content2: 'dummy2',
    };
  },
};
</script>
