import React, { useState, useEffect } from 'react';
import { useRecordContext,useResourceContext } from 'react-admin';

const CustomImageUpload = ({ source, onChange }) => {
    const record = useRecordContext();
    const resource = useResourceContext();
    const [image, setImage] = useState(null);
    const [src, setSrc] = useState(null);
    const [showImage, setShowImage] = useState(record[source]);
    
 
    useEffect(() => {
        if (record && record[source]) {
            setShowImage(record[source]);
        }
    }, [record, source]);

    useEffect(()=>{
        if (resource ==='products'){
            setSrc(`${process.env.VITE_API_URL}/assets/${resource}/md/${showImage.medium}`)
        }else{
            setSrc(`${process.env.VITE_API_URL}/assets/${resource}/${showImage}`)
        }
  },[])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Create a new URL for the file to preview it
            const fileURL = URL.createObjectURL(file);
            setImage(fileURL);

            // Notify parent component of the file change
            onChange(file);
        }
    };

    return (
        <div className="mb-4">
            <label className="block font-bold mb-2">Product Image</label>
            {showImage && (
                <div className="mb-2  flex w-full">
                    <img
                        src={src}
                        alt="Product"
                        className="w-[50%] mx-auto h-auto object-cover border border-gray-300 rounded-md"
                    />
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-gray-700"
            />
        </div>
    );
};

export default CustomImageUpload;
