import React, { useEffect, useRef, useState } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios'; 

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const ChartComponent = () => {
    const chartRef = useRef(null);
    const [categories, setCategories] = useState([]); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Expenses');
                const data = response.data.map(expense => expense.category); 
                setCategories(data); 
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchCategories(); 
    }, []); 

    useEffect(() => {
        if (categories.length > 0) { 
            const ctx = chartRef.current.getContext('2d');
            const data = {
                labels: categories,
                datasets: [{
                    data: categories.map(() => Math.random() * 100), 
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
                }],
            };

            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    maintainAspectRatio: false,
                },
            };

            const myChart = new Chart(ctx, config);

            return () => {
                myChart.destroy();
            };
        }
    }, [categories]); 

    return (
        <canvas ref={chartRef} height={400} width={400}></canvas>
    );
}

export default ChartComponent;