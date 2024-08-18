import React, { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const MyChartComponent = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const data = {
            labels: ['Red', 'Blue', 'Yellow'],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }],
        };

        const config = {
            type: 'doughnut',
            data: data,
        };

        const myChart = new Chart(ctx, config);

        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <canvas ref={chartRef}></canvas>
    );
}

export default MyChartComponent;