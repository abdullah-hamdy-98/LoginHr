import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { data, options } from './ChartsConfig/BarChartConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
    const [chartWidth, setChartWidth] = useState('370px');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1366) {
                setChartWidth('450px');
            } else {
                setChartWidth('370px');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ width: chartWidth, height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

export default BarChart;
