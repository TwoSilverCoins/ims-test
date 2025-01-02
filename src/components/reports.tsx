import React, { useEffect, useState } from 'react';

function Reports() {
    const [reportData, setReportData] = useState<any[]>([]);

    const fetchReportData = async () => {
        const response = await fetch('http://localhost:3001/reports/generate');
        const data = await response.json();
        setReportData(data);
    };

    useEffect(() => {
        fetchReportData();
    }, []);

    return (
        <div>
            <h2>Inventory Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Stock Level</th>
                        <th>Reorder Point</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.stockLevel}</td>
                            <td>{item.reorderPoint}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Reports;
