import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';


const Dashboard = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios.get('/api/stock') // Adjust to match your backend API
            .then((response) => {
                const data = response.data; // Assume data has { labels, datasets }
                setChartData(data);
            })
            .catch((error) => console.error('Error fetching stock data:', error));
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            {chartData ? (
                <Line data={chartData} options={options} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
