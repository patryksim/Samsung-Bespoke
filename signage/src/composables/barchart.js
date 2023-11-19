import theme from '@/styles/theme';
import { Chart } from 'chart.js';
import { onMounted } from 'vue';

export default function barChart() {
  onMounted(() => {
    const ctx = document.getElementById('barChart').getContext('2d');

    const BarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [4, 5, 6, 7, 8, 9, 10, 11],
        datasets: [
          {
            data: [400, 100, 200, 100, 100, 400, 300, 100],
            backgroundColor: theme.colors.blue,
            maxBarThickness: 40,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        lineTension: 1,
        borderRadius: 20,
        scales: {
          y: {
            max: 1200,
            min: 0,
            position: 'right',
            grid: {
              drawBorder: false,
            },
            ticks: {
              benginAtZero: true,
              stepSize: 300,
              padding: 20,
              font: {
                size: 18,
              },
            },
          },
          x: {
            grid: {
              display: false,
              borderWidth: 3,
              borderColor: theme.colors.blueGray,
            },
            ticks: {
              font: {
                size: 20,
              },
            },
          },
        },
      },
    });
    console.log('BarChart', BarChart);
  });
}
