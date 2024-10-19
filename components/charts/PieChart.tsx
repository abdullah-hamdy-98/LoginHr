import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { data, options } from './ChartsConfig/PieChartConfig'


ChartJS.register(ArcElement, Tooltip, Legend);


function PieChart() {
    return (
        <div style={{ width: '200px' , justifyContent: 'center', alignItems: 'center',marginLeft:'90px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;