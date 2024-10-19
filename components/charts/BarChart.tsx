import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { data, options } from './ChartsConfig/BarChartConfig'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function BarChart() {
    return (
        <div style={{ width: '370px', height: '25vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;