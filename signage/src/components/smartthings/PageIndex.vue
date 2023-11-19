<template>
  <wrapper :class="wrapperClass">
    <image-top :chapterMenu="chapterMenu" :class="wrapperClass?'image-top':''">
      <img :src="imageTop" :alt="imageTopAlt" />
      <div>
        <h1 class="smartthings-title">SmartThings Home</h1>
        <div class="chapter-wrapper">
          <p :class="[longTitle?'long':'', 'chapter-title']">{{ chapterTitle }}</p>
          <p :class="[longTitle?'long':'', 'chapter-description']">{{ chapterDesc }}</p>
        </div>
        <p class="chapter-info">Touch below to experience SmartThings benefits</p>
      </div>
    </image-top>

    <slot></slot>

    <image-bottom @click="goLandingPage" :class="wrapperClass?'image-bottom':''">
      <div>
        <p class="smartthings-title">
          Return to experience more about<br />
          <span>SmartThings</span>
        </p>
        <img src="/images/smartthings/tab-icon-common-bottom.png" alt="Return to experience more about SmartThings" />
      </div>
    </image-bottom>
  </wrapper>
</template>

<script>
import { ref } from 'vue';
import { vw, calc } from '@/styles/mixin';
import styled from 'vue3-styled-components';
import { useRouter } from 'vue-router';

const baseProps = {
  isTablet: {
    type: Boolean,
    default: true,
  },
  imageTop: {
    type: String,
    required: false,
  },
  imageTopAlt: {
    type: String,
    required: false,
  },
  imageBottom: {
    type: String,
    require: false,
    default: '/images/smartthings/tab-index-common-bottom.png',
  },
  chapterMenu: {
    type: String,
    require: true,
  },
  chapterTitle: {
    type: String,
    require: true,
  },
  chapterDesc: {
    type: String,
    require: true,
  },
  longTitle: {
    type: Boolean,
    default: false,
  },
};

const class43Inch = 'pageindex-43inch';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: ${process.env.NODE_ENV === 'production' ? '100vw' : '100vh'};

  &.${class43Inch} {
    width: 100vw;
    min-height: 100vh;
  }

  ul {
    flex: 1 0 auto;
    ${vw('padding', [44, 72])}
  }

  &.${class43Inch} ul {
    ${vw('padding', [60, 72])}
  }

  li {
    position: relative;

    &::after {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      right: 0;

      transform: rotate(180deg);
      ${vw('width', 64)};
      ${vw('height', 64)};
      border: none;
      ${vw('border-radius', 70)};
      background-color: rgba(0,0,0,0.8);

      background-image: url(/images/smartthings/tab-icon-dockbar-prev.svg);
      background-position: center;
      background-size: auto ${calc(30)};
      background-repeat: no-repeat;
    }
  }

  li ~ li {
    ${vw('margin-top', 44)}
  }

  &.${class43Inch} li ~ li {
    ${vw('margin-top', 60)}
  }
`;

const ImageTop = styled('div', baseProps)`
  ${vw('height', 495)}
  ${({ chapterMenu }) => chapterMenu && `background: url('/images/smartthings/tab-index-${chapterMenu}-top.png') center;`}
  background-repeat: no-repeat;
  background-size: cover;

  > div {
    ${vw('padding-top', 125)};
    text-align: center;

    > .smartthings-title {
      color: #000;
      ${vw('font-size', 46)}
      font-family: 'SamsungSharpSans';
      font-weight: bold;
      font-style: normal;
      letter-spacing: .01em;
    }

    > .chapter-wrapper {
      ${vw('margin', [100, 0, 58])};

      > .chapter-title {
        color: #fff;
        ${vw('font-size', 52)}
        font-family: 'SamsungSharpSans';
        font-weight: bold;
        font-style: normal;

        &.long {
          ${vw('font-size', 40)}
        }
      }

      > .chapter-description {
        ${vw('margin-top', 21)};
        color: #fff;
        ${vw('font-size', 20)}
        font-family: 'SamsungSharpSans';
        font-weight: 500;
        font-style: normal;
        letter-spacing: 0.03em;

        &.long {
          ${vw('margin-top', 33)};
        }
      }
    }

    >.chapter-info {
      opacity: 0.5;
      color: #1d1d1b;
      ${vw('font-size', 16)}
      font-family: 'SamsungSharpSans';
      font-weight: 500;
      font-style: normal;
      letter-spacing: 0.05em;
    }
  }

  &.image-top {
    ${vw('height', 550)}  
    ${({ chapterMenu }) => chapterMenu && `background: url('/images/smartthings/43inch-index-${chapterMenu}-top.png') center;`}
    background-repeat: no-repeat;
    background-size: cover;

    & .chapter-wrapper {
      ${vw('margin', [120, 0, 58])};
    }

    & > div {
      ${vw('padding-top', 140)};
    }
  }
`;

const ImageBottom = styled.figure`
  width: 100%;
  background: #000;

  > div {
    position: relative;
    z-index:3
    ${vw('padding', [50, 70, 40, 85])};
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;

    > p {
      font-family: 'SamsungSharpSans';
      letter-spacing: -0.03em;
      line-height: 1.5;
      ${vw('font-size', 22)};

      > span {
        font-weight: 700;
        letter-spacing: normal;
      }
    }

    > img {
      ${vw('width', 55)};
    }
  }

  &.image-bottom > div {
    ${vw('padding', [60, 70, 63, 85])};
  }
`;

export const PageIndexTitle = styled.p`
  ${vw('margin-bottom', 8)}
  ${vw('font-size', 20)}
  font-weight: 700;
  line-height: 1.5;
  font-family: SamsungSharpSans;
  text-transform: capitalize;

  .${class43Inch} & {
    ${vw('font-size', 22)}
    ${vw('margin-bottom', 7)}
  }

  > span {
    font-weight: 500;
    letter-spacing: -0.021em;
  }
`;

export const PageIndexDesc = styled.p`
  min-height: 3em;
  color: #1d1d1b80;
  ${vw('font-size', 18)}
  font-weight: 500;
  line-height: 1.5;
  font-family: SamsungSharpSans;
  letter-spacing: -0.042em;

  .${class43Inch} & {
    ${vw('font-size', 16)}
  }
`;

export default {
  components: { Wrapper, ImageTop, ImageBottom },
  props: baseProps,
  setup(props) {
    const wrapperClass = ref('');
    if (!props.isTablet) wrapperClass.value = class43Inch;

    const router = useRouter();
    const goLandingPage = () => {
      if (wrapperClass.value !== class43Inch) {
        router.push('/smartthings');
      }
    };

    return {
      props,
      wrapperClass,
      goLandingPage,
    };
  },
};
</script>
