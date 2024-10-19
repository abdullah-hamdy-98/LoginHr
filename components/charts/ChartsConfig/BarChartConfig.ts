export const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Hired Employees',
      data: [12, 21, 17, 13, 28, 32],
      backgroundColor: 'rgba(30, 144, 255, 0.5)',
      borderColor: 'rgba(30, 144, 255, 1)',
      borderWidth: 1,
      borderRadius: 2,
    },
  ],
};


export const options = {

  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#888',
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        color: '#888',
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        color: '#666',
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderWidth: 0.5,
      borderColor: '#ddd',
    },
  },
  elements: {
    bar: {
      borderSkipped: false,
    },
  },
};
