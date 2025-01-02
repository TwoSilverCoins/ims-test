import React, { useEffect, useState } from 'react';

// Define an interface for the equipment data
interface Equipment {
  id: number;
  name: string;
  category: string;
  stockLevel: number;
  reorderPoint: number;
}

function StockDashboard() {
  // Initialize state for equipment list with an empty array
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  // Fetch equipment data from the backend when the component mounts
  useEffect(() => {
    fetch('/equipment')
      .then((response) => response.json())
      .then((data) => setEquipment(data));
  }, []);

  return (
    <div>
      <h2>Stock Dashboard</h2>
      <ul>
        {/* Iterate over equipment list and display each item */}
        {equipment.map((item) => (
          <li key={item.id}>
            {item.name} - {item.category} - Stock: {item.stockLevel} - Reorder Point: {item.reorderPoint}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockDashboard;