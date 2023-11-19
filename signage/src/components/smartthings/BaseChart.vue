<template>
  <wrapper :x="x" :y="y">
    <div>
      <!-- <canvas id="barChart" width="400" height="300"></canvas> -->
      <!-- <canvas id="lineChart" width="400" height="300"></canvas> -->
      <canvas id="lineChart" width="513" height="420" @click="chart()"></canvas>
      <!-- <canvas id="doughnutChart" width="400" height="300"></canvas> -->
      <!-- <progress-item
        title="39.8 kWh"
        subtitle="Refrigerator"
        barwidth="10%"
        color="green"
        imgurl="/images/smartthings/tab-icon-energy-air-conditioner.png"
      /> -->
    </div>
  </wrapper>
</template>

<script>
import { Chart, BarElement, BarController, LineElement, LineController, PointElement, LinearScale, CategoryScale, registerables } from 'chart.js';
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
// import barChart from '@/composables/barchart';
import lineChart from '@/composables/linechart';
// import doughnutChart from '@/composables/doughnutchart';
// import ProgressItem from './ProgressItem.vue';

const baseProps = {
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
};

Chart.register(BarElement, BarController, LineElement, LineController, PointElement, LinearScale, CategoryScale, ...registerables);

const Wrapper = styled('div', baseProps)`
  position: absolute;
  background: ${({ theme }) => theme.colors.backgroundGray};
  ${({ y }) => vw('top', y)}
  ${({ x }) => vw('left', x)}
`;
// const canvas = styled('div', baseProps)`
// `;

const chartData = [
  0, 0, 5, 6, 12,
  13, 14, 16, 17, 17,
  18, 19,
];

export default {
  components: {
    Wrapper,
    // ProgressItem,
  },
  props: {
    baseProps,
  },
  setup() {
    const { updateCharts } = lineChart();
    // doughnutChart();
    const chart = () => {
      updateCharts(chartData);
    };
    return {
      Wrapper,
      chart,
      // horizontalBarChart,
    };
  },
};
</script>
