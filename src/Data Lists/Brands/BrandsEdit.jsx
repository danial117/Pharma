
import { Edit, SimpleForm,Toolbar,SaveButton,DeleteButton, TextInput} from 'react-admin';

import CustomImageUpload from '../../utils/CustomImageupload';
import { useState } from 'react';




const BrandEdit = (props) => {

    const [imageFile, setImageFile] = useState(null);


    const handleImageChange = (file) => {
        setImageFile(file);
    };


    const transform = (data) => {
        const formData = new FormData();
    
        if (imageFile) {
            console.log(imageFile)
            formData.append('file', imageFile);
        }
       
        if (data.name) formData.append('name', data.name);

        return formData

    }


    const BrandEditToolbar = () => (
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
            <SaveButton alwaysEnable />
            <DeleteButton />
           
        </Toolbar>
    );



    return (
        <Edit {...props} transform={transform}>
            <SimpleForm toolbar={<BrandEditToolbar/>} className='w-full'>
                <CustomImageUpload source='brandLogoPath' onChange={handleImageChange} />
                <TextInput className='w-[50%]' source="name" />
               
            </SimpleForm>
        </Edit>
    );
};


export default BrandEdit;