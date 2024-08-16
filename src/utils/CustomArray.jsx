import { useState,useEffect } from 'react';
import { useRecordContext } from 'react-admin';

const CustomArrayInput = ({ source,onChange, label, ...rest }) => {
    const record = useRecordContext();
    
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        if (onChange) {
            onChange(items);
        }
    }, [items, onChange]);

    // Extract the array from the nested source path
    useEffect(() => {
        if (record) {
            const sourceParts = source.split('.');
            let nestedArray = record;

            // Traverse the nested structure based on source path
            for (const part of sourceParts) {
                nestedArray = nestedArray?.[part];
                if (!nestedArray) break;
            }

            setItems(nestedArray || []);
        }
    }, [record, source]);

   
    const handleAddItem = () => {
        if (newItem.trim()) {
            setItems([...items, newItem.trim()]);
            setNewItem('');
        }
    };

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemChange = (index, value) => {
        const updatedItems = [...items];
        updatedItems[index] = value;
        setItems(updatedItems);
    };

    // Effect to update record when items change
    

    return (
        <div className="mb-4">
            <label className="block font-bold mb-2">{label}</label>
            <div className="mb-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => handleItemChange(index, e.target.value)}
                            className="flex-1 p-2 mr-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="bg-red-500 text-white p-2 rounded-md"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className="flex-1 p-2 mr-2 border border-gray-300 rounded-md"
                />
                <button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-green-500 text-white p-2 rounded-md"
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default CustomArrayInput;
