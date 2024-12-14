import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Dashboard() {
    const [salesData, setSalesData] = useState([]);
    const [seriesData, setSeriesData] = useState({series1: 0, series2: 0, series3: 0});

    useEffect(() => {
        axios.get('/api/products/sales')
            .then(response => {
                // salesData and seriesData
                setSalesData(response.data.salesData);
                setSeriesData(response.data.seriesData);
            })
            .catch(error => console.error('Error fetching dashboard data:', error));
    }, []);

    const barData = {
        labels: salesData.map(data => data.date),
        datasets: [
            {
                label: 'Sales by Date',
                data: salesData.map(data => data.total),
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
        ]
    };

    const pieData = {
        labels: ['Series 1', 'Series 2', 'Series 3'],
        datasets: [
            {
                label: 'Series Distribution',
                data: [seriesData.series1, seriesData.series2, seriesData.series3],
                backgroundColor: ['red', 'blue', 'green'],
                hoverOffset: 4
            }
        ]
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '20px' }}>
            <div style={{ width: '50%' }}>
                <Bar data={barData} />
            </div>
            <div style={{ width: '45%' }}>
                <Pie data={pieData} />
            </div>
        </div>
    );
}

export default Dashboard;
