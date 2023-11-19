<template>
  <page-dimmed v-show="dimmedShow" :x="x" :y="y" :width="width" :height="height" :radius="radius" :isShow="isShow" :radiusGroup="radiusGroup"/>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { vw } from '@/styles/mixin';
import styled from 'vue3-styled-components';

const baseProps = {
  isShow: {
    type: Boolean,
    default: false,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  radius: {
    type: Number,
    default: 0,
  },
  radiusGroup: {
    type: Array,
    default: [0, 0, 0, 0],
  },
};

const PageDimmed = styled('div', { ...baseProps, color: String })`
  position: fixed;
  ${({ y }) => vw('top', y)}
  ${({ x }) => vw('left', x)}
  ${({ width }) => vw('width', width)}
  ${({ height }) => vw('height', height)}
  z-index: 100;
  opacity: 0.5;
  ${({ radius }) => vw('border-radius', radius)}
  box-shadow: 0 0 0 5000px rgba(0, 0, 0, 70%);
  &.top {
    ${({ radiusGroup }) => vw('border-radius', radiusGroup)};
  }
`;

export default {
  components: { PageDimmed },
  props: baseProps,
  setup(props) {
    const dimmedShow = ref(false);

    onMounted(() => {
      if (props.isShow) {
        setTimeout(() => {
          dimmedShow.value = true;
        }, 1500);
      } else {
        dimmedShow.value = false;
      }
    });

    watch(() => props.isShow, () => {
      if (props.isShow) {
        dimmedShow.value = true;
      } else {
        dimmedShow.value = false;
      }
    });

    return {
      dimmedShow,
      props,
    };
  },
};
</script>
