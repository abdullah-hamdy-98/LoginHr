import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { data, options } from './ChartsConfig/HorizontalConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function HorizontalBar() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '0 20px' }}>
            <div style={{ width: '800px', height: '45vh' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default HorizontalBar;
