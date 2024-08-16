
import { Edit, SimpleForm, TextInput} from 'react-admin';
import {useRecordContext } from 'ra-core';
import CustomImageUpload from '../../utils/CustomImageupload';
import { useState } from 'react';






const NewsEdit = (props) => {

    const [imageFile, setImageFile] = useState(null);

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
   
    if (data.title) formData.append('title', data.title);
    if (data.content) formData.append('content', data.content);
    if (data.topic) formData.append('topic', data.topic);
    

   

    return formData;
};






    return (
        <Edit {...props} transform={transform}>
            <SimpleForm className='w-full'>
                <CustomImageUpload source='imageUrl' onChange={handleImageChange} />
                <TextInput className='w-[50%]' source="title" />
                <TextInput className='w-[50%]' source="content" />
                <TextInput className='w-[50%]' source="topic" />
                
              
            </SimpleForm>
        </Edit>
    );
};


export default NewsEdit;