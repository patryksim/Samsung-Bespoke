import { injectGlobal } from 'vue3-styled-components';
import reset from '@/styles/reset';
import { calc } from './mixin';

export default injectGlobal`
  ${reset}
  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto-Medium.ttf') format('truetype');
    font-weight: 500;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto-Regular.ttf') format('truetype');
    font-weight: 400;
  }

  @font-face {
    font-family: 'SamsungSharpSans';
    src: url('/fonts/samsungsharpsans-bold_v2.woff2') format('truetype');
    font-weight: 700;
  }

  @font-face {
    font-family: 'SamsungSharpSans';
    src: url('/fonts/samsungsharpsans-medium_v2.woff2') format('truetype');
    font-weight: 500;
  }

  @font-face {
    font-family: 'SamsungSharpSans';
    src: url('/fonts/SamsungSharpSansRg.woff') format('truetype');
    font-weight: 400;
  }

  @font-face {
    font-family: 'SamsungOne';
    src: url('/fonts/SamsungOne-400.woff2') format('truetype');
    font-weight: 400;
  }

  @font-face {
    font-family: 'SamsungOne';
    src: url('/fonts/SamsungOne-700.woff2') format('truetype');
    font-weight: 700;
  }

  body {
    font-family: 'SamsungOne';
    overflow: hidden;
  }
  @keyframes touch {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
  @keyframes hide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  .slide-left-enter-active, .slide-left-leave-active,
  .slide-right-enter-active, .slide-right-leave-active {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    transition: transform 1s ease-in-out;
  }

  .slide-left {
    &-enter-from {
      transform: translateX(${calc(720)}) !important;
    }

    &-leave-from, &-enter-to {
      transform: translateX(0) !important;
    }

    &-leave-to {
      transform: translateX(${calc(-720)}) !important;
    }
  }

  .slide-right {
    &-enter-from {
      transform: translateX(${calc(-720)}) !important;
    }

    &-leave-from, &-enter-to {
      transform: translateX(0) !important;
    }

    &-leave-to {
      transform: translateX(${calc(720)}) !important;
    }
  }

  #app {
    &.rotate {
      transform: rotate(-90deg);
      transform-origin: left top;
      width: 100vh;
      height: 100vw;
      overflow: hidden;
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
`;
