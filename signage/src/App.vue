<template>
  <theme-provider :theme="DefaultTheme">
    <wrapper>
      <router-view v-slot="{ route, Component }">
        <transition :name="landing ? '' : (route.meta.transitionName || 'slide-left')">
          <component :is="Component" />
        </transition>
      </router-view>
      <div v-if="$route.meta.isSmartThings && $route.meta.isTabletPage">
        <menu-item />
      </div>
    </wrapper>
  </theme-provider>
</template>

<script>
import styled, { ThemeProvider } from 'vue3-styled-components';
import { useRouter, useRoute } from 'vue-router';
import { useState, useMutations } from '@/store/helper';
import io from '@/api/socket';
import '@/styles/GlobalStyle';
import DefaultTheme from '@/styles/theme';
import MenuItem from '@/components/smartthings/MenuItem.vue';
import { vw } from '@/styles/mixin';
import { useI18n } from 'vue-i18n';

const Wrapper = styled.div`
  ${vw('width', 720)}
  min-height: ${process.env.NODE_ENV === 'production' ? '100vw' : '100vh'};
  overflow: hidden;
`;

export default {
  components: { ThemeProvider, Wrapper, MenuItem },
  setup() {
    const {
      init,
      scrollInterior,
      randingHide,
      setInterior,
      setInteriorList,
      setFridges,
      setResultItems,
      setProduct,
      setPage,
      setTotalPage,
      setIsKitchen,
      setUseProductType,
      setPreviewMode,
      setIsColor,
      setProductPreviewMode,
      setIsSmallAirDresser,
    } = useMutations();
    const { landing, productUrl, previewMode } = useState();
    const route = useRoute();
    const router = useRouter();
    const socketOnRoute = (event, path, callback) => {
      io.on(event, (...params) => {
        if (path && route.path !== path) {
          router.push(path);
        }

        callback?.(...params);
      });
    };

    // Bespoke Studio
    socketOnRoute('init', '/', init);
    socketOnRoute('scrollInterior', null, scrollInterior);
    socketOnRoute('moveToInteriorList', '/');
    socketOnRoute('closeLandingPage', '/', randingHide);
    socketOnRoute('setInterior', null, setInterior);
    socketOnRoute('setInteriorList', null, setInteriorList);
    socketOnRoute('showResultPage', '/preview', setResultItems);
    socketOnRoute('setPreviewMode', null, (isPreview) => {
      setPreviewMode(isPreview);
      router.push(productUrl.value);
    });
    socketOnRoute('setProducts', null, (data) => {
      setFridges(data);
      // router.push(productUrl.value);
    });
    socketOnRoute('setProductList', null, (data) => {
      setProduct(data);
      if (!previewMode.value) {
        router.push(productUrl.value);
      }
    });
    socketOnRoute('paging', null, setPage);
    socketOnRoute('totalPage', null, setTotalPage);
    socketOnRoute('isKitchen', null, setIsKitchen);
    socketOnRoute('useProductType', null, setUseProductType);
    socketOnRoute('previewMode', null, setPreviewMode);
    socketOnRoute('setIsColor', null, (data) => {
      setIsColor(data);
    });
    socketOnRoute('moveProductStep', null, (productPage) => {
      setIsColor(false);
      setPreviewMode(false);
      if (productPage) {
        router.push('/previewMode');
      } else {
        router.push(productUrl.value);
      }
    });
    socketOnRoute('productPreviewMode', null, setProductPreviewMode);
    socketOnRoute('isSmallAirDresser', null, setIsSmallAirDresser);

    // Smart Things
    socketOnRoute('playAirCareVideo', '/smartthings/aircare5');
    socketOnRoute('playClothingCareVideo', '/smartthings/clothingcare2');
    socketOnRoute('enteredGuidedCooking', '/smartthings/cooking3');
    socketOnRoute('playCookingVideo', '/smartthings/cooking3');
    socketOnRoute('playCookingVideo2', '/smartthings/cooking3');
    socketOnRoute('playCookingVideo3', '/smartthings/cooking6');
    socketOnRoute('playCookingVideo4', '/smartthings/cooking7');
    socketOnRoute('playCookingVideo5', '/smartthings/cooking3');
    socketOnRoute('playCookingVideo6', '/smartthings/cooking3');
    socketOnRoute('playCookingVideo7', '/smartthings/cooking3');
    socketOnRoute('playCookingVideo8', '/smartthings/cooking3');
    socketOnRoute('turnOnHood', '/smartthings/cooking8');
    socketOnRoute('LandingPage', '/smartthings/43inch');
    socketOnRoute('playVideo', '/smartthings/petcare3');
    socketOnRoute('turnOnTV', '/smartthings/petcare5');
    socketOnRoute('musicPlay', '/smartthings/petcare5');
    socketOnRoute('TabPetCarePageIndex', '/smartthings/petcareIndex');
    socketOnRoute('TabPetCarePage1', '/smartthings/petcare1');
    socketOnRoute('TabPetCarePage2', '/smartthings/petcare2');
    socketOnRoute('TabPetCarePage3', '/smartthings/petcare3');
    socketOnRoute('TabPetCarePage4', '/smartthings/petcare4');
    socketOnRoute('TabPetCarePage5', '/smartthings/petcare5');
    socketOnRoute('TabPetCarePage6', '/smartthings/petcare6');
    socketOnRoute('TabEnergyPageIndex', '/smartthings/energyIndex');
    socketOnRoute('TabEnergyPage1', '/smartthings/energy1');
    socketOnRoute('TabEnergyPage2', '/smartthings/energy1');
    socketOnRoute('TabEnergyPage3', '/smartthings/energy1');
    socketOnRoute('TabEnergyPage4', '/smartthings/energy1');
    socketOnRoute('TabEnergyPage5', '/smartthings/energy2');
    socketOnRoute('TabCookingPageIndex', '/smartthings/cookingIndex');
    socketOnRoute('TabCookingPage1', '/smartthings/cooking1');
    socketOnRoute('TabCookingPage2', '/smartthings/cooking1');
    socketOnRoute('TabCookingPage3', '/smartthings/cooking3');
    socketOnRoute('TabCookingPage5', '/smartthings/cooking3');
    socketOnRoute('TabCookingPage6', '/smartthings/cooking3');
    socketOnRoute('TabCookingPage7', '/smartthings/cooking5');
    socketOnRoute('TabCookingPage8', '/smartthings/cooking6');
    socketOnRoute('TabCookingPage9', '/smartthings/cooking7');
    socketOnRoute('TabCookingPage10', '/smartthings/cooking3');
    socketOnRoute('TabCookingPage11', '/smartthings/cooking9');
    socketOnRoute('TabAirCarePageIndex', '/smartthings/aircareIndex');
    socketOnRoute('TabAirCarePage1', '/smartthings/aircare1');
    socketOnRoute('TabAirCarePage2', '/smartthings/aircare2');
    socketOnRoute('TabAirCarePage3', '/smartthings/aircare3');
    socketOnRoute('TabAirCarePage4', '/smartthings/aircare4');
    socketOnRoute('TabAirCarePage5', '/smartthings/aircare5');
    socketOnRoute('TabAirCarePage6', '/smartthings/aircare6');
    socketOnRoute('TabClothingCarePageIndex', '/smartthings/clothingcareIndex');
    socketOnRoute('TabClothingCarePage1', '/smartthings/clothingcare1');
    socketOnRoute('TabClothingCarePage2', '/smartthings/clothingcare2');
    socketOnRoute('TabClothingCarePage3', '/smartthings/clothingcare2');
    socketOnRoute('TabClothingCarePage4', '/smartthings/clothingcare2');
    socketOnRoute('TabClothingCarePage5', '/smartthings/clothingcare2');
    socketOnRoute('TabClothingCarePage6', '/smartthings/clothingcare6');
    socketOnRoute('TabHomeCarePageIndex', '/smartthings/homecareIndex');
    socketOnRoute('TabHomeCarePage1', '/smartthings/homecare1');
    socketOnRoute('TabHomeCarePage2', '/smartthings/homecare2');
    socketOnRoute('TabHomeCarePage3', '/smartthings/homecare2');
    socketOnRoute('showHomeCareMark', '/smartthings/homecare2');
    socketOnRoute('hideHomeCareMark', '/smartthings/homecare2');
    socketOnRoute('useHomeCareMark', '/smartthings/homecare2');
    socketOnRoute('TabHomeCarePage4', '/smartthings/homecare4');
    socketOnRoute('TabHomeCarePage6', '/smartthings/homecare6');
    socketOnRoute('energyInit', '/smartthings/energy1');
    socketOnRoute('energySaving', '/smartthings/energy1');
    socketOnRoute('saveModeStart', '/smartthings/energy1');
    socketOnRoute('chartInit', '/smartthings/energy1');
    socketOnRoute('chartStart', '/smartthings/energy1');
    socketOnRoute('chartEnd', '/smartthings/energy1');
    socketOnRoute('aiSavingMode', '/smartthings/energy1');
    socketOnRoute('aiSavingModeEnd', '/smartthings/energy3');

    const isTablet = window.location.hash.includes('tab') || window.location.hash === '#/smartthings';
    if (process.env.NODE_ENV === 'production' && isTablet) {
      const { setRotate } = useMutations();

      setRotate(true);
      document.querySelector('#app').classList.add('rotate');
    }

    const { t } = useI18n();
    window.$t = t;

    return {
      landing,
      DefaultTheme,
      MenuItem,
    };
  },
};
</script>
