<template>
  <button-wrapper>
    <div @click="goMainPage" v-if="$route.meta.isLandingPage">
      <img src="/images/smartthings/tab-icon-dockbar-home.svg" alt="home-icon">
    </div>
    <div @click="goLandingPage" v-if="!$route.meta.isLandingPage && !$route.meta.isLastPage">
      <img src="/images/smartthings/tab-icon-dockbar-menu.svg" alt="home-icon">
    </div>
    <div @click="goBackPage" v-if="!$route.meta.isLandingPage">
      <img src="/images/smartthings/tab-icon-dockbar-prev.svg" alt="home-icon">
    </div>
  </button-wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import { useRouter, useRoute } from 'vue-router';
// import socket from '@/api/socket';

const ButtonWrapper = styled('div', { color: String })`
  position: absolute;
  ${vw('top', 28)};
  ${vw('left', 20)};
  color: ${({ theme }) => theme.colors.white};
  z-index:999;

  > div{
    ${vw('width', 64)};
    ${vw('height', 64)};
    border: none;
    ${vw('border-radius', 70)};
    background-color: ${({ theme }) => theme.colors.transparentBlack};
    display: flex;
    align-items: center;

    :not(:first-child) {
      ${vw('margin-top', 16)};
    }

    > img {
      ${vw('height', 30)};
      margin: 0 auto;
    }
  }
`;
export default {
  components: { ButtonWrapper },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const goMainPage = () => {
      window.location.href = 'http://localhost:3000';
    };
    const goLandingPage = () => {
      router.push('/smartthings');
    };
    const goBackPage = () => {
      if (route.query.index && route.query.sc === 'y') {
        router.push('/smartthings');
      } else {
        router.go(-1);
      }
    };
    return {
      goMainPage,
      goLandingPage,
      goBackPage,
    };
  },
};
</script>
