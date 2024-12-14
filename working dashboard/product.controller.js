export const getSalesData = async (req, res) => {
    try {
        const salesData = await Product.aggregate([

            {
                $group: {
                    _id: "$dateSold",
                    total: { $sum: "$amount" },
                }
            }
        ]);

        const seriesData = await Product.aggregate([
            {
                $group: {
                    _id: "$series",
                    count: { $sum: 1 }
                }
            }
        ]);

        const formattedSalesData = salesData.map(item => ({
            date: item._id,
            total: item.total
        }));

        const formattedSeriesData = {
            series1: seriesData.find(item => item._id === 'series 1')?.count || 0,
            series2: seriesData.find(item => item._id === 'series 2')?.count || 0,
            series3: seriesData.find(item => item._id === 'series 3')?.count || 0,
        };

        res.json({ salesData: formattedSalesData, seriesData: formattedSeriesData });
    } catch (error) {
        console.error('Failed to fetch sales data:', error);
        res.status(500).send('Failed to fetch sales data');
    }
};
