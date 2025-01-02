import React, { useEffect, useState } from 'react';

function Analytics() {
    const [analyticsData, setAnalyticsData] = useState<{ totalEquipment: number, lowStock: number }>({ totalEquipment: 0, lowStock: 0 });

    const fetchAnalyticsData = async () => {
        const response = await fetch('http://localhost:3001/reports/analytics');
        const data = await response.json();
        setAnalyticsData(data);
    };

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    return (
        <div>
            <h2>Analytics</h2>
            <p>Total Equipment: {analyticsData.totalEquipment}</p>
            <p>Low Stock Items: {analyticsData.lowStock}</p>
        </div>
    );
}

export default Analytics;
