import { createStore } from 'vuex';

const productUrl = '/product';
const previewUrl = '/preview';
const previewModeUrl = '/previewMode';

export default createStore({
  state: {
    randing: true,
    interior: 0,
    interiorList: [],
    fridges: {},
    activeFridge: '',
    resultItems: {},
    interiorScroll: 0,
    previewMode: false,
    productUrl: previewModeUrl,
    rotate: false,
    lineChart: false,
    isKitchen: false,
    page: 1,
    totalPage: 1,
    product: [],
    useProductType: null,
    productPreviewMode: false,
    isColorSelect: false,
    isSmallAirDresser: false,
  },
  mutations: {
    setIsColor(state, val) {
      state.isColorSelect = val;
    },
    setInterior(state, i) {
      state.interior = i;
    },
    setInteriorList(state, interiorList) {
      state.interiorList = interiorList;
    },
    scrollInterior(state, i) {
      state.interiorScroll = i;
    },
    setFridges(state, fridges) {
      state.fridges = fridges;
    },
    setActiveFridge(state, activeFridge) {
      state.activeFridge = activeFridge;
    },
    randingHide(state) {
      state.randing = false;
    },
    togglePreviewMode(state) {
      state.previewMode = !state.previewMode;

      if (state.previewMode) {
        state.productUrl = productUrl;
      } else if (state.productPreviewMode) {
        state.productUrl = previewUrl;
      } else {
        state.productUrl = previewModeUrl;
      }
    },
    setPreviewMode(state, previewMode) {
      state.previewMode = previewMode;

      if (state.previewMode) {
        state.productUrl = productUrl;
      } else if (state.productPreviewMode) {
        state.productUrl = previewUrl;
      } else {
        state.productUrl = previewModeUrl;
      }
    },
    init(state) {
      state.randing = true;
      state.interior = 0;
      state.fridges = {};
      state.activeFridge = '';
      state.previewMode = false;
      state.productUrl = previewModeUrl;
      state.rotate = false;
      state.page = 1;
      state.totalPage = 1;
      state.product = [];
      state.productPreviewMode = false;
      state.useProductType = null;
      state.isSmallAirDresser = false;
    },
    setResultItems(state, resultItems) {
      state.resultItems = resultItems;
    },
    setRotate(state) {
      state.rotate = true;
    },
    setLineChart(state, bool) {
      state.lineChart = bool;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
    setIsKitchen(state, isKitchen) {
      state.isKitchen = isKitchen;
    },
    setUseProductType(state, useProductType) {
      state.useProductType = useProductType;
    },
    setProductPreviewMode(state, productPreviewMode) {
      state.productPreviewMode = productPreviewMode;
    },
    setIsSmallAirDresser(state, isSmallAirDresser) {
      state.isSmallAirDresser = isSmallAirDresser;
    },
  },
  getters: {
    selectedInterior({ interior, interiorList, isSmallAirDresser }) {
      const [data] = interiorList.filter((item) => item.number === interior + 1);
      if (isSmallAirDresser) {
        return {
          ...data,
          image: {
            ...data.image,
            default: data.image.default.replace('.jpg', '_AD_450.jpg'),
          },
        };
      }
      return data;
    },
    selectedFridgeColor({ fridges }) {
      return Object.values(fridges).filter((fridge) => fridge.doorList.length).length;
    },
    activeFridge({ activeFridge, fridges }) {
      return activeFridge !== '' ? fridges[activeFridge] : null;
    },
    activeFridgeKey({ activeFridge, fridges }) {
      return activeFridge !== '' ? (fridges[activeFridge] && fridges[activeFridge].itemIndex) : 0;
    },
    fridgeArray({ fridges }) {
      const fridgeArray = [];
      Object.values(fridges).map((fridge) => {
        fridgeArray[fridge.itemIndex] = fridge;
        return fridge;
      });
      return fridgeArray;
    },
    resultItemsList({ resultItems }) {
      const productList = [];
      Object.values(resultItems.product).map((item) => {
        productList[item.itemIndex] = item;
        return item;
      });
      return {
        ...resultItems,
        product: productList,
      };
    },
    productItemList({ product }) {
      if (!product.length) return [];

      const items = {
        fridges: [],
        product: [],
      };

      product.forEach((childItem) => {
        childItem.forEach((item) => {
          if (item.componentType === 'fridge') {
            items.fridges.push(item);
          } else {
            items.product.push(item);
          }
        });
      });

      return items;
    },
    productModelList({ product, page }) {
      if (!product.length) return [];
      const addPageIndex = (item, index) => {
        let itemLength = 0;
        let count = 0;
        if (page < 2) return { ...item, pageIndex: index + 1 };

        while (true) {
          if (count >= page - 1) break;
          // eslint-disable-next-line no-loop-func
          product[count].forEach((data) => {
            if (data.multiple) {
              itemLength += data.items.length;
            } else {
              itemLength += 1;
            }
          });

          count += 1;
        }

        return {
          ...item,
          pageIndex: itemLength + index + 1,
        };
      };
      const items = [];
      product[page - 1].forEach((item, index) => {
        if (item.componentType === 'fridge') {
          items.push(addPageIndex(item, index));
        } else if (item.multiple) {
          item.items.forEach((data, childIndex) => (items.push(addPageIndex(data, childIndex))));
        } else {
          items.push(addPageIndex(item, index));
        }
      });

      return items;
    },
    productModelDetail({ product, useProductType }) {
      if (!product.length || !useProductType) return [];
      const items = [];

      const linkedProductTypeList = [
        ['dryer', 'washer'],
      ];

      const linkedProductTypes = linkedProductTypeList.filter((types) => types.includes(useProductType)).pop();
      if (linkedProductTypes !== undefined) {
        product.forEach((parentItem) => {
          parentItem.forEach((item) => {
            if (linkedProductTypes.includes(item.componentType) === false) return;

            if (item.multiple) {
              item.items.forEach((data) => (items.push(data)));
            } else {
              items.push(item);
            }
          });
        });

        items.sort((a, b) => linkedProductTypes.indexOf(a.componentType) - linkedProductTypes.indexOf(b.componentType));
      } else {
        product.forEach((parentItem) => {
          parentItem.forEach((item) => {
            if (item.componentType !== useProductType) return;

            if (item.multiple) {
              item.items.forEach((data) => (items.push(data)));
            } else {
              items.push(item);
            }
          });
        });
      }

      return items;
    },
    isProductPreviewGroup({ useProductType }) {
      const groupPreviewTypes = ['oven', 'dryer', 'washer'];
      return groupPreviewTypes.includes(useProductType);
    },
    isFrontTypeGroup({ useProductType }) {
      const frontTypeGroup = ['acr'];
      return frontTypeGroup.includes(useProductType);
    },
  },
});
