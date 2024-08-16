
import { Edit, SimpleForm, TextInput} from 'react-admin';
import {useRecordContext } from 'ra-core';
import CustomImageUpload from '../../utils/CustomImageupload';
import { useState } from 'react';


// const ProductEdit = function({id})  {
   
//    console.log(id)
//     return (
//         <Edit >
//       <div className='w-full  h-[70vh]'>
//         <div className='flex my-8 w-[80%]  mx-auto flex-row '  >
//             <div className='basis-[30%] h-[60vh] p-10 flex flex-col gap-y-4 bg-blue-700'>
//                 <p className='text-white text-[2rem] font-Lexend'>Get in touch</p>
//                 <p className='text-white font-Livvic text-xs '>The changes made will be directed to take upto 10 mins and the product will be disabled for 10 minutes before the updates are visible.</p>


//             </div>

//             <div className='basis-[70%] border-2 border-gray-300 shadow-md shadow-gray-300'>
//                 <div className='m-12'>
//                     <p className='font-Abel  text-xs'>Warning! Please make the changes carefully as the product will be affected in real time</p>
//                     <div className='flex my-6 flex-col gap-y-2'>
//                         <div>
//                             <p className='font-Lexend text-gray-500'></p>
//                             <input className='focus:outline-none w-[40%] border-2 border-gray-100 rounded-sm p-[3px] bg-gray-200'  name='name' type='text' />
//                         </div>

//                         <div>
//                             <p className='font-Lexend text-gray-500'>Brand:</p>
//                             <input className='focus:outline-none w-[40%] border-2 border-gray-100 rounded-sm p-[3px] bg-gray-200'  type='text' />
//                         </div>

//                         <div>
//                             <p className='font-Lexend text-gray-500'>Price:</p>
//                             <input className='focus:outline-none w-[40%] border-2 border-gray-100 rounded-sm p-[3px] bg-gray-200'  type='text' />
//                         </div>


//                     </div>
//                 </div>


//             </div>

//         </div>


//       </div>
//         </Edit>
//     );
// };








const BrandEdit = (props) => {

    const [imageFile, setImageFile] = useState(null);


    const handleImageChange = (file) => {
        setImageFile(file);
    };


    const transform = (data) => {
        const formData = new FormData();
    
        if (imageFile) {
            formData.append('file', imageFile);
        }
       
        if (data.name) formData.append('name', data.name);

        return formData

    }



    return (
        <Edit {...props} transform={transform}>
            <SimpleForm className='w-full'>
                <CustomImageUpload source='brandLogoPath' onChange={handleImageChange} />
                <TextInput className='w-[50%]' source="name" />
               
            </SimpleForm>
        </Edit>
    );
};


export default BrandEdit;