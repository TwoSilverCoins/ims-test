import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define an interface for the form data
interface FormData {
    name: string;
    category: string;
    stockLevel: number;
    reorderPoint: number;
}

function CreateEquipment() {
    // Initialize state for form data with empty values
    const [formData, setFormData] = useState<FormData>({ name: '', category: '', stockLevel: 0, reorderPoint: 0 });

    // Handle form submission
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Send a POST request to the backend to create a new equipment
        try {
            const response = await fetch('http://localhost:3001/equipment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // Convert form data to JSON
            });
            if (response.ok) {
                toast.success('Equipment created successfully!');
            } else {
                toast.error('Failed to create equipment.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again');
        }
    };

    // Handle input change
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // Update form data state
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input field for equipment name */}
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            {/* Input field for equipment category */}
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
            />
            {/* Input field for stock level */}
            <input
                type="number"
                name="stockLevel"
                value={formData.stockLevel}
                onChange={handleChange}
                placeholder="Stock Level"
            />
            {/* Input field for reorder point */}
            <input
                type="number"
                name="reorderPoint"
                value={formData.reorderPoint}
                onChange={handleChange}
                placeholder="Reorder Point"
            />
            {/* Submit button */}
            <button type="submit">Add Equipment</button>
            <ToastContainer aria-label='notification center'/>
        </form>
    );
}

export default CreateEquipment;