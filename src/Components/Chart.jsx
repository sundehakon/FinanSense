import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { Box } from '@mui/material';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const ChartComponent = () => {
    const chartRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Expenses');
                const categoryData = response.data.map(expense => expense.category);
                const amountData = response.data.map(expense => expense.amount);
                setCategories(categoryData);
                setAmounts(amountData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data', error);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const chartData = useMemo(() => {
        const categoryColors = {
            Food: '#205A28',
            Transport: '#2b2d42',
            Entertainment: '#C5ADC5',
            Utilities: '#E5EDF1',
            Healthcare: '#E7473C',
            Other: '#ECA427',
        };

        return {
            labels: categories,
            datasets: [{
                data: amounts, 
                backgroundColor: categories.map(category => categoryColors[category])
            }],
        };
    }, [categories, amounts]);

    const chartConfig = useMemo(() => ({
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    }), [chartData]);

    useEffect(() => {
        if (categories.length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const myChart = new Chart(ctx, chartConfig);

            return () => {
                myChart.destroy();
            };
        }
    }, [categories, chartConfig]);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && categories.length > 0 && (
                <Box>
                    <canvas ref={chartRef}></canvas>
                </Box>
            )}
        </>
    );
};

export default ChartComponent;