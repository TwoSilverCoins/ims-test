import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    name: string;
    category: string;
    stockLevel: number;
    reorderPoint: number;
}

interface UpdateEquipmentProps {
    id: number;
}

function UpdateEquipment({ id }: UpdateEquipmentProps) {
    const [formData, setFormData] = useState<FormData>({ name: '', category: '', stockLevel: 0, reorderPoint: 0 });

    useEffect(() => {
        fetch(`http://localhost:3001/equipment/${id}`)
            .then((response) => response.json())
            .then((data) => setFormData(data));
    }, [id]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try { 
            const response = await fetch(`http://localhost:3001/equipment/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast.success('Equipment updated successfully!');
            } else {
                toast.error('Failed to update equipment.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again. ')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
            <input type="number" name="stockLevel" value={formData.stockLevel} onChange={handleChange} placeholder="Stock Level" />
            <input type="number" name="reorderPoint" value={formData.reorderPoint} onChange={handleChange} placeholder="Reorder Point" />
            <button type="submit">Update Equipment</button>
            <ToastContainer aria-label='notification center'/>
        </form>
    );
}

export default UpdateEquipment;
