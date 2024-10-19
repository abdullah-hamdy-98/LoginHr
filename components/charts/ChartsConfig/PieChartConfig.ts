export const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Gender Distribution',
        data: [55, 45], 
        backgroundColor: [
          'rgba(30, 144, 255, 0.5)', 
          'rgba(255, 99, 132, 0.6)', 
        ],
        borderColor: [
          'rgba(30, 144, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: '#666',
        },
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