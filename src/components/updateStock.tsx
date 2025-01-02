import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define properties for updateStock component
interface updateStockProps {
    id: number;
    initialStockLevel: number;
    initialReorderPoint: number;
}

function UpdateStock({ id, initialStockLevel, initialReorderPoint }: updateStockProps) {
    // Initialize state for stock level and reorder point
    const [stockLevel, setStockLevel] = useState<number>(initialStockLevel);
    const [reorderPoint, setReorderPoint] = useState<number>(initialReorderPoint);

    // Handle stock level input change
    const handleStockChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStockLevel(parseInt(event.target.value, 10));
    };

    // Handle reorder point input change
    const handleReorderChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReorderPoint(parseInt(event.target.value, 10));
    };

    // Handle form submission
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Update stock level in the backend
        await fetch(`/equipment/${id}/stock`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stockLevel }),
        });
        // Update reorder point in the backend
        await fetch(`/equipment/${id}/reorder`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reorderPoint }),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            type='number'
            value={stockLevel}
            onChange={handleStockChange}
            placeholder='Stock Level'
            />
            <input
            type='number'
            value={reorderPoint}
            onChange={handleReorderChange}
            placeholder='Reorder Point'
            />
            <button type='submit'>Update Stock</button>
        </form>
    );
}

export default UpdateStock;