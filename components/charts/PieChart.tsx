import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { data, options } from './ChartsConfig/PieChartConfig'


ChartJS.register(ArcElement, Tooltip, Legend);


function PieChart() {
    const [chartLeft, setChartLeft] = useState('90px');
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1366) {
                setChartLeft('120px');
            } else {
                setChartLeft('90px');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div style={{ width: '200px', justifyContent: 'center', alignItems: 'center', marginLeft: chartLeft }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;