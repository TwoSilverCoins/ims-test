import React, { useEffect, useState } from 'react';

// Define an interface for the equipment data
interface Equipment {
  id: number;
  name: string;
  category: string;
  stockLevel: number;
  reorderPoint: number;
}

function StockAlerts() {
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
      <h2>Stock Alerts</h2>
      <ul>
        {/* Iterate over equipment list and display alerts for low stock */}
        {equipment
          .filter((item) => item.stockLevel <= item.reorderPoint)
          .map((item) => (
            <li key={item.id}>
              {item.name} - {item.category} - Stock: {item.stockLevel} (Below Reorder Point)
            </li>
          ))}
      </ul>
    </div>
  );
}

export default StockAlerts;