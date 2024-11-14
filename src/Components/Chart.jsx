import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const ChartComponent = () => {
    const chartRef = useRef(null);
    const [categoryTotals, setCategoryTotals] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    const { user } = useAuth0();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/Expenses?userId=${user?.sub}`);
                const expenses = response.data;

                const totals = expenses.reduce((acc, expense) => {
                    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                    return acc;
                }, {});

                setCategoryTotals(totals);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data', error);
                setError('No data to show');
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
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals), 
                backgroundColor: Object.keys(categoryTotals).map(category => categoryColors[category] || '#cccccc')  
            }],
        };
    }, [categoryTotals]);

    const chartConfig = useMemo(() => ({
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    }), [chartData]);

    useEffect(() => {
        const calcTotal = () => {
            const total = Object.values(categoryTotals).reduce((acc, curr) => acc + curr, 0);
            setTotal(total);
        };

        calcTotal();
    }, [categoryTotals]);

    useEffect(() => {
        if (Object.keys(categoryTotals).length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const myChart = new Chart(ctx, chartConfig);

            return () => {
                myChart.destroy();
            };
        }
    }, [categoryTotals, chartConfig]);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && Object.keys(categoryTotals).length > 0 && (
                <Typography variant='h4'>{total}$</Typography>
            )}
            {!loading && !error && Object.keys(categoryTotals).length > 0 && (
                <Box>
                    <canvas ref={chartRef}></canvas>
                </Box>
            )}
        </>
    );
};

export default ChartComponent;