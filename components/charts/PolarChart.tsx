import {Chart as ChartJS,PolarAreaController, RadialLinearScale,ArcElement,Tooltip,Legend} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { data, options } from './ChartsConfig/PolarChartConfig'

ChartJS.register(PolarAreaController,RadialLinearScale, ArcElement,Tooltip,Legend);



function PolarChart() {
    return (
        <div style={{ width: '650px',height:'50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PolarArea data={data} options={options} />
        </div>
    );
};

export default PolarChart;