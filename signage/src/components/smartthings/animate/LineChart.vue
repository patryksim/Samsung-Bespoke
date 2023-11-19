<template>
  <wrapper :save="save" :ani="ani">
    <div>
      <img src="/images/smartthings/energy-chart.png" alt="">
    </div>
    <div>
      <img src="/images/smartthings/energy-chart2.png" alt="">
    </div>
    <template v-if="lineChart">
      <div>
        <div class="overflow-hidden">
          <div class="graph-bg"></div>
        </div>
        <div class="graph-circle"></div>
      </div>
      <div>
        <span>
          {{energy}}
        </span>
      </div>
    </template>
  </wrapper>
</template>

<script>
import { ref, onUnmounted } from 'vue';
import { useState } from '@/store/helper';
import { vw } from '@/styles/mixin';
import styled from 'vue3-styled-components';
import socket from '@/api/socket';
import Timeout from '@/composables/Timeout';

const Wrapper = styled('div', { start: Boolean, save: Boolean, ani: Boolean })`
  > div {
    :nth-child(1) {
      z-index: 2;
      width: 0;
      > img {
        ${vw('min-width', 280)}
      }
    }
    :nth-child(2) {
      position: relative;
      z-index: 1;
      height: 0;
      transition-delay: 1s;
      ${vw('top', -110)}
      ${vw('left', -92)}
      > img {
        ${vw('min-height', 33)}
      }
      ::before {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        ${vw('top', 33)}
        ${vw('width', 1)}
        ${vw('height', 275)}
        background: ${({ theme }) => theme.colors.black}
      }
    }
    :nth-child(3) {
      z-index: 0;
      width: 0;
      position: absolute;
      ${vw('height', 220)}
      ${vw('top', -55)}
      ${vw('left', 266)}
      .graph-bg {
        position:absolute;
        left:0;
        top:0;
        ${vw('width', 152)};
        height:100%;
        border-top:0.5vw dashed #aaa;
        transition:top 1s, transform 1s, background-color 1s;
        background-color: rgba(253, 144, 127, 0.7);
        ${vw('top', 45)}
        transform:skewY(-12deg);

        ${({ ani }) => ani && `
          background-color:rgba(255, 198, 88, 0.7);
          ${vw('top', 58)}
          transform:skewY(-3deg);
        `}
      }
      .graph-wrapper {
        position:absolute;
        left:0;
        top:0;
        ${vw('width', 152)};
        height:100%;
      }
      .graph-circle {
        position:absolute;
        ${vw('left', 142)};
        ${vw('top', 18)};
        ${vw('width', 8)};
        ${vw('height', 8)};
        background-color:white;
        border-radius:50%;
        border-color:#f9aea2;
        border-style:solid;
        ${vw('border-width', 6)};
        transition:background 1s, top 1s;

        ${({ ani }) => ani && `
          border-color:#FDBF6E;
          ${vw('top', 44)}
        `}
      }
      animation: redChart 1s forwards;
    }
    :nth-child(4) {
      z-index: 3;
      ${vw('height', 18)}
      ${vw('line-height', 20)}
      ${vw('top', -35)}
      width:0px;
      background-color:#f36e50;
      box-sizing:border-box;
      ${vw('font-size', 12)}
      ${vw('border-radius', 15)}
      overflow:hidden;
      > span {
        display:block;
        ${vw('width', 28)};
        color:white;
        text-align:center;
      }
      transition:background-color 1s, top 1s;

      ${({ ani }) => ani && `
        background-color:#FDBF6E;
        ${vw('top', -10)}
      `}

      animation: redSmallChart 1s forwards;
      animation-delay: 1s;
    }

    ${({ start }) => start && `
      :nth-child(1) { ${vw('width', 280)} }
      :nth-child(2) { ${vw('height', 275)} }
    `}
  }

  @keyframes redChart {
    0% {
      width: 0;
    }
    100% {
      ${vw('width', 162)}
    }
  }
  @keyframes redSmallChart {
    0% {
      width: 0;
    }
    100% {
      ${vw('width', 28)}
    }
  }
`;

export default {
  components: { Wrapper },
  props: {
    save: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { lineChart } = useState();
    const ani = ref(false);
    const energy = ref(420);
    const { setTimer, clearTimer } = Timeout();

    if (props.save) {
      setTimer(setTimeout(() => {
        ani.value = true;
        socket.emit('energySaving');
        setInterval(() => {
          if (energy.value > 400) {
            energy.value -= 1;
          }
        }, 50);
      }, 3000));
    }

    onUnmounted(() => {
      clearTimer();
    });

    return {
      lineChart,
      ani,
      energy,
    };
  },
};
</script>
