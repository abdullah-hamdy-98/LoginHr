import { useEffect, useState } from 'react';
import { Chart as ChartJS, PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { data, options } from './ChartsConfig/PolarChartConfig'

ChartJS.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);



function PolarChart() {
    const [chartWidth, setChartWidth] = useState('600px');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1366) {
                setChartWidth('670px');
            } else {
                setChartWidth('600px');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div style={{ width: chartWidth, height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PolarArea data={data} options={options} />
        </div>
    );
};

export default PolarChart;