import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Dashboard() {
    const [stockData, setStockData] = useState([]);
    const [seriesData, setSeriesData] = useState({ series1: 0, series2: 0, series3: 0 });

    useEffect(() => {
        axios.get('/api/stocks/monthly-summary')
            .then(response => {
                const formattedData = response.data.map(item => ({
                    month: item._id, // Assuming _id is the month number
                    totalStock: item.totalStock
                }));
                setStockData(formattedData);
            })
            .catch(error => console.error('Error fetching monthly stock data:', error));

        axios.get('/api/products/sales')
            .then(response => {
                setSeriesData(response.data.seriesData);
            })
            .catch(error => console.error('Error fetching series data:', error));
    }, []);

    const lineData = {
        labels: stockData.map(data => `Month ${data.month}`),
        datasets: [
            {
                label: 'Total Stocks by Month',
                data: stockData.map(data => data.totalStock),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }
        ]
    };

    const pieData = {
        labels: ['Series 1', 'Series 2', 'Series 3'],
        datasets: [
            {
                label: 'Series Distribution',
                data: [seriesData.series1, seriesData.series2, seriesData.series3],
                backgroundColor: ['pink', 'yellow', 'lightblue'],
                hoverOffset: 4
            }
        ]
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <div style={{ width: '50%' }}>
                <Line data={lineData} />
            </div>
            <div style={{ width: '45%' }}>
                <Pie data={pieData} />
            </div>
        </div>
    );
}

export default Dashboard;
