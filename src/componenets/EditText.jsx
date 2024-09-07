import React, { useState, useEffect } from 'react';
import { TextField, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useRecordContext } from 'react-admin';



const getNestedValue = (obj, path) => {
  if (!obj || !path) return '';
  const pathArray = path.split('.');
  return pathArray.reduce((acc, part) => {
    if (acc && acc.hasOwnProperty(part)) {
      return acc[part];
    }
    return ''; // Return an empty string if the path does not fully exist
  }, obj);
};

const setNestedValue = (obj, path, value) => {
  if (!obj || !path) return;
  const pathArray = path.split('.');
  const lastKey = pathArray.pop();
  const targetObject = pathArray.reduce((acc, part) => {
    if (!acc[part]) acc[part] = {}; // Ensure each segment exists
    return acc[part];
  }, obj);
  targetObject[lastKey] = value;
};

const EditableText = ({ source, className, style, onChange,id }) => {
  const record = useRecordContext();

  const initialText = getNestedValue(record, source) || '';

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  
    if (onChange) {
      const updatedRecord = { ...record };
      setNestedValue(updatedRecord, source, text); // Update the nested value in the record
      onChange(id, updatedRecord); // Notify parent of the updated record
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isEditing ? (
        <TextField
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          variant="outlined"
          size="small"
          fullWidth
          inputProps={{ style: { padding: 0, ...style } }}
        />
      ) : (
        <div
          className="p-2 cursor-pointer border-2 border-dashed border-blue-600"
          onClick={handleDoubleClick}
        >
          {text}
          <IconButton size="small" className="absolute  top-0 right-0">
            <Edit  fontSize="small" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default EditableText;

