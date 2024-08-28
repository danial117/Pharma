import { useState, useEffect } from 'react';
import { useRecordContext } from 'react-admin';

const CustomObjectArrayInput = ({ source, onChange, label, ...rest }) => {
    const record = useRecordContext();
    
    const [items, setItems] = useState([]);
    const [newOption, setNewOption] = useState({ option: '', price: '' });

    useEffect(() => {
        if (onChange) {
            onChange(items);
        }
    }, [items, onChange]);

    // Extract the array from the nested source path
    useEffect(() => {
        if (record) {
            const sourceParts = source?.split('.');
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
        console.log(items)
        if (newOption.option.trim() && newOption.price.trim()) {
            setItems([...items, { ...newOption }]);
            setNewOption({ option: '', price: '' });
        }
    };

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    return (
        <div className="mb-4">
            <label className="block font-bold mb-2">{label}</label>
            <div className="mb-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={item.option}
                            onChange={(e) => handleItemChange(index, 'option', e.target.value)}
                            placeholder="Option"
                            className="flex-1 p-2 mr-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                            placeholder="Price"
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
                    value={newOption.option}
                    onChange={(e) => setNewOption({ ...newOption, option: e.target.value })}
                    placeholder="Option"
                    className="flex-1 p-2 mr-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    value={newOption.price}
                    onChange={(e) => setNewOption({ ...newOption, price: e.target.value })}
                    placeholder="Price"
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

export default CustomObjectArrayInput;
