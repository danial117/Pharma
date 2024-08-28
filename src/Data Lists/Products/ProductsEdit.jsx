import { Edit, SimpleForm, TextInput, NumberInput,SaveButton,Toolbar, DeleteButton} from 'react-admin';
import CustomArrayInput from '../../utils/CustomArray';
import { useState } from 'react';
import CustomImageUpload from '../../utils/CustomImageupload';
import CustomObjectArrayInput from '../../utils/CustomObjectArray';
const ProductEdit = (props) => {
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState([]);
    const [imageFile, setImageFile] = useState(null);


    const handleDietaryRestrictionsChange = (updatedArray) => {
        console.log(dietaryRestrictions)
        setDietaryRestrictions(updatedArray);
    };

    const handleCertificationsChange = (updatedArray) => {
        setCertifications(updatedArray);
    };

    const handleOptionsChange = (updatedArray) => {
        setOptions(updatedArray);
    };

    const handleCategoriesChange = (updatedArray) => {
        setCategories(updatedArray);
       
    };

    const handleImageChange = (file) => {
        setImageFile(file);
    };

    
    const transform = (data) => {
        const formData = new FormData();
    
        // Append the image file if it exists
        if (imageFile) {
            formData.append('file', imageFile);
        }
    
        // Append basic fields
       
        if (data.name) formData.append('name', data.name);
        if (data.brand) formData.append('brand', data.brand);
        if (data.price) formData.append('price', Number(data.price).toFixed(2));
        
        if (Array.isArray(options) && options.length > 0) {
            options.forEach((option, index) => {
                // Append each property of the option object with a unique key
                formData.append(`options[${index}][option]`, option.option);
                formData.append(`options[${index}][price]`, option.price);
                








            });
        }






        
    
        // Append category if it exists and is not empty
        if (data.category && categories.length > 0 ) {
        
           categories.forEach((cat, index) => {
                formData.append(`category[${index}]`, cat);
            });
        }else{
            formData.append('category', JSON.stringify([]));
        }
    
        // Append Certifications if they exist
        if (data.details && data.details.Certifications) {
            certifications.forEach((cert, index) => {
                formData.append(`details[Certifications][${index}]`, cert);
            });
        }
    
        // Append Dietary Restrictions if they exist
        if (data.details && data.details.DietaryRestrictions) {
            dietaryRestrictions.forEach((restriction, index) => {
                formData.append(`details[DietaryRestrictions][${index}]`, restriction);
            });
        }
    
        // Append other details if they exist
        if (data.details) {
            Object.entries(data.details).forEach(([key, value]) => {
                if (key !== 'Certifications' && key !== 'DietaryRestrictions') {
                    formData.append(`details[${key}]`, value === undefined || value === null ? '' : value.toString());
                }
            });
        }
    
        return formData;
    };

    const ProductEditToolbar = () => (
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
            <SaveButton alwaysEnable />
            <DeleteButton />
           
        </Toolbar>
    );
    


    return (
        <Edit {...props} transform={transform}>
            <SimpleForm toolbar={<ProductEditToolbar/>} className='w-full'>
            <CustomImageUpload source="productImage" onChange={handleImageChange}/>
                <TextInput className='w-[50%]' source="name" />
                <TextInput className='w-[50%]' source="brand" />
                <NumberInput className='w-[50%]' source="price" />
                
               
                <TextInput multiline className='w-[50%]' source="details.Description" />
                <TextInput multiline className='w-[50%]' source="details.Warnings" />
                <TextInput multiline className='w-[50%]' source="details.More" />
                
                <CustomObjectArrayInput source="options" label="Options" onChange={handleOptionsChange} />
                <CustomArrayInput source="details.DietaryRestrictions" label="Dietary Restrictions" onChange={handleDietaryRestrictionsChange} />
                <CustomArrayInput source="details.Certifications" label="Certificates" onChange={handleCertificationsChange} />
                <CustomArrayInput source="category" label="Categories" onChange={handleCategoriesChange} />
               
                
            </SimpleForm>
        </Edit>
    );
};

export default ProductEdit;
