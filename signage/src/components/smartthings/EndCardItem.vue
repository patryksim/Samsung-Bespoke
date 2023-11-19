<template>
  <wrapper :chapterMenu="chapterMenu" :class="wrapperClass">
    <item-top :longTitle="longTitle" :class="wrapperClass?'item-top':''">
      <h2 v-html="chapterTitle"></h2>
      <p>{{chapterDesc}}</p>
      <div></div>
    </item-top>

    <end-card :longDesc="longDesc" :class="wrapperClass?'end-card':''">
      <h2>Connected Devices</h2>
      <slot></slot>
      <p v-html="endCardDesc"></p>
    </end-card>

    <item-bottom :class="wrapperClass?'item-bottom':''">
      <h6>Tab here to experience more</h6>
      <p>For more information, Contact nearby sales personal</p>
    </item-bottom>
  </wrapper>
</template>

<script>
import { ref } from 'vue';
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const baseProps = {
  isTablet: {
    type: Boolean,
    default: true,
  },
  chapterTitle: {
    type: String,
    default: '',
  },
  chapterDesc: {
    type: String,
    default: '',
  },
  chapterMenu: {
    type: String,
    default: 'cooking',
  },
  endCardDesc: {
    type: String,
    default: '',
  },
  longTitle: {
    type: Boolean,
    default: false,
  },
  longDesc: {
    type: Boolean,
    default: false,
  },
};

const class43Inch = 'endcard-43inch';

const Wrapper = styled.div`
  width: 100%;
  min-height: ${process.env.NODE_ENV === 'production' ? '100vw' : '100vh'};
  ${({ chapterMenu }) => chapterMenu && `background: url('/images/smartthings/tab-img-${chapterMenu}-last.png') center;`}
  background-repeat: no-repeat;
  background-size: cover;
  font-family: SamsungSharpSans;

  &.${class43Inch} {
    ${({ chapterMenu }) => chapterMenu && `background: url('/images/smartthings/43inch-img-${chapterMenu}-last.png') center;`}
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    min-height: 100vh;
  }
`;

const ItemTop = styled.div`
  ${vw('padding-top', 63)}
  width: 100%;
  text-align: center;

  ${({ longTitle }) => longTitle && vw('padding-top', 45)}

  & > h2 {
    ${vw('font-size', 43)}
    font-weight: 700;
    white-space: pre-wrap;
  }

  & > p {
    ${vw('margin-top', 22)}
    ${vw('margin-bottom', 55)}
    ${vw('font-size', 17)}
    font-weight: 500;
    opacity: .3;

    ${({ longTitle }) => longTitle && vw('margin-bottom', 30)}
  }

  & > div {
    ${vw('height', 405)}
    width: 100%;
  }

  &.item-top {
    ${vw('padding-top', 80)}
    > h2 {
      ${vw('font-size', 46)}
    }
    > div {
      ${vw('height', 420)}
    }
  }
`;

const EndCard = styled.div`
  ${vw('height', 375)}

  & > h2 {
    ${vw('padding-top', 35)}
    ${vw('font-size', 35)}
    font-weight: 700;
    line-height: 1;
    font-family: SamsungSharpSans;
    text-align: center;
  }

  & > p {
    ${vw('font-size', 12)}
    line-height: 1;
    font-weight: 500;
    font-family: SamsungSharpSans;
    text-align: center;
    opacity: .5;
    letter-spacing: -0.01em;

    ${({ longDesc }) => longDesc && vw('padding-top', 15)}
    ${({ longDesc }) => longDesc && 'line-height: 1.44;'}
  }

  &.end-card {
    ${vw('height', 460)}
    > h2 {
      ${vw('padding-top', 40)}
      ${vw('padding-bottom', 10)}
    }
    > p {
      ${({ longDesc }) => longDesc && 'line-height: 1.44;'}
    }
  }
`;

const ItemBottom = styled.div`
  ${vw('margin-top', 105)}
  text-align: center;

  & > h6 {
    color: #fff;
    ${vw('font-size', 17)}
    font-weight: 700;
  }

  & > p {
    ${vw('margin-top', 10)}
    color: #fff;
    ${vw('font-size', 13)}
    font-weight: 500;
    letter-spacing: -0.01em;
    opacity: 0.5;
  }
`;

export default {
  components: { Wrapper, ItemTop, EndCard, ItemBottom },
  props: baseProps,
  setup(props) {
    const wrapperClass = ref('');
    if (!props.isTablet) wrapperClass.value = class43Inch;

    return {
      props,
      wrapperClass,
    };
  },
};
</script>
