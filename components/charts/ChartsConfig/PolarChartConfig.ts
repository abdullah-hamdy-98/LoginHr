export const data = {
  labels: ['Tanta Gharbia Gov', 'Nasr City Cairo Gov', 'Alex Alexandria Gov', 'Shabshir Al Hissah Gov'],
  datasets: [
    {
      label: 'Employees per Branch',
      data: [10, 15, 8, 12],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// Options configuration
export const options = {
  responsive: true,
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
      borderWidth: 1,
      borderColor: '#ddd',
    },
  },
};
