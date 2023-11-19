import theme from '@/styles/theme';
import { Chart } from 'chart.js';
import { onMounted } from 'vue';

export default function doughnutChart() {
  onMounted(() => {
    const ctx = document.getElementById('doughnutChart').getContext('2d');

    const DoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: {
              display: false,
            },
            data: [57, 20, 15, 8],
            backgroundColor: [theme.colors.chart.lightBlue, theme.colors.chart.pastelBlue, theme.colors.chart.blue, theme.colors.chart.darkBlue],
            borderWidth: 0,

          },
        ],
      },
      options: {
        cutout: '80%',
      },
    });
    console.log('DoughnutChart', DoughnutChart);
  });
}
