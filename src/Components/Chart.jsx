import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const ChartComponent = () => {
    const chartRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Expenses');
                const data = response.data.map(expense => expense.category);
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories', error);
                setError('Failed to fetch categories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const chartData = useMemo(() => ({
        labels: categories,
        datasets: [{
            data: categories.map(() => Math.random() * 100),
            backgroundColor: categories.map(() => generateRandomColor()),
        }],
    }), [categories]);

    const chartConfig = useMemo(() => ({
        type: 'doughnut',
        data: chartData,
        options: {
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
                <canvas ref={chartRef} height={400} width={400}></canvas>
            )}
        </>
    );
};

export default ChartComponent;
