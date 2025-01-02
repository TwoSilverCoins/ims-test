import React, { useEffect, useState, ChangeEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Equipment {
    id: number;
    name: string;
    category: string;
    stockLevel: number;
    reorderPoint: number;
}

function EquipmentList() {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [stockLevel, setStockLevel] = useState<number | ''>('');
    const [reorderPoint, setReorderPoint] = useState<number | ''>('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);

    const fetchEquipment = async () => {
        const response = await fetch(`http://localhost:3001/equipment?page=${page}&limit=${limit}&search=${search}&category=${category}&stockLevel=${stockLevel}&reorderPoint=${reorderPoint}`);
        const data = await response.json();
        setEquipment(data.data);
        setTotal(data.total);
    };

    useEffect(() => {
        fetchEquipment();
    }, [page, search, category, stockLevel, reorderPoint]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleStockLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStockLevel(event.target.value ? parseInt(event.target.value) : '');
    };

    const handleReorderPointChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReorderPoint(event.target.value ? parseInt(event.target.value) : '');
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleUpdate = (id: number) => {
        // Logic for updating the equipment item
        console.log(`Update equipment with ID: ${id}`);
        toast.success('Equipment updated successfully!');
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3001/equipment/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setEquipment(equipment.filter((item) => item.id !== id));
                toast.success('Equipment deleted successfully!');
            } else {
                toast.error('Failed to delete equipment.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="container mx-auto p-4">
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    className="form-input mt-1 block w-full"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                />
                <select className="form-select mt-1 block w-full" value={category} onChange={handleCategoryChange}>
                    <option value=""><em>All Categories</em></option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Office Supplies">Office Supplies</option>
                </select>
                <input
                    type="number"
                    className="form-input mt-1 block w-full"
                    value={stockLevel}
                    onChange={handleStockLevelChange}
                    placeholder="Stock Level"
                />
                <input
                    type="number"
                    className="form-input mt-1 block w-full"
                    value={reorderPoint}
                    onChange={handleReorderPointChange}
                    placeholder="Reorder Point"
                />
            </div>
            <ul className="list-disc pl-5">
                {equipment.map((item) => (
                    <li key={item.id} className="mb-2">
                        <div className="flex justify-between items-center">
                            <span>
                                {item.name} - {item.category} - Stock: {item.stockLevel} - Reorder Point: {item.reorderPoint}
                            </span>
                            <div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleUpdate(item.id)}>Update</button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mx-1"
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <ToastContainer aria-label="notification center" />
        </div>
    );
}

export default EquipmentList;
