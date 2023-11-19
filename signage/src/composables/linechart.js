import theme from '@/styles/theme';
import { Chart } from 'chart.js';
import { onMounted } from 'vue';

export default function lineChart() {
  let LineChart = null;
  // const defaultChart = [
  //   0, 0, 0, 0, 0,
  //   0, 0, 0, 0, 0,
  //   0, 0,
  // ];

  const updateCharts = (updateData) => {
    LineChart.data.datasets[1].data = updateData;
    LineChart.update();
  };

  onMounted(() => {
    const ctx = document.getElementById('lineChart').getContext('2d');

    LineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '26 Mearch', '', '', '', '',
          '', '', '', '', '',
          '', '', '', '', '',
          '', '', '', '', '',
          '', '', '', '', '',
          '', '', '', '', '',
          '25 April'],
        datasets: [
          {
            label: 'My home',
            data: [],
            backgroundColor: theme.colors.transparentBlue,
            fill: true,
            pointBackgroundColor: theme.colors.white,
            pointBorderColor: theme.colors.blue,
            pointStyle: 'Rounded',
          },
          {
            label: 'Device',
            data: [],
            // [
            //   0, 2, 3, 4, 5,
            //   6, 7, 8, 9, 10,
            //   11, 12, 13, 14, 15,
            //   23, 24, 25, 26, 27,
            //   28, 29, 30, 31, 32,
            //   33, 34, 35, 40, 45,
            //   48,
            // ],
            borderWidth: 0,
            backgroundColor: theme.colors.blue,
            fill: true,
            pointRadius: 0,
            pointStyle: 'Rounded',
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        cutoutPercentage: 70,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 80,
            ticks: {
              benginAtZero: true,
              stepSize: 80,
              padding: 20,
              font: {
                size: 20,
              },
            },
            position: 'right',
          },
          x: {
            grid: {
              borderWidth: 3,
              borderColor: theme.colors.blueGray,
            },
            ticks: {
              autoSkip: false,
              maxTicksLimit: 2,
            },
          },
        },
      },
    });
  });

  return {
    updateCharts,
  };
}
