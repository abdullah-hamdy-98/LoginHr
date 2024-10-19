import { ChartOptions, ChartData } from 'chart.js';

export const data: ChartData<'bar', number[]> = {
    labels: ['Abdullah Hamdy', 'Ibrahim Farag', 'Muhammed Mussalam', 'Muhammed Reda', 'Sherif Allam'],
    datasets: [
        {
            label: 'Hours Worked (Day)',
            data: [120, 150, 100, 170, 140],
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
        },
        {
            label: 'Hours Worked (Vacations)',
            data: [40, 38, 45, 42, 39],
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
        },
        {
            label: 'Completed Projects',
            data: [8, 12, 9, 11, 10],
            backgroundColor: 'rgba(255, 206, 86, 0.8)',
        },
    ],
};

export const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
            borderRadius: 10
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    size: 10,
                },
            },
        },
    },
    scales: {
        x: {
            grid: {
                display: false, 
            },
        },
        y: {
            grid: {
                display: false, 
            },
        },
    },
};
