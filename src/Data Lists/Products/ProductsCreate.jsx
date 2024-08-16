
import { Create, SimpleForm, TextInput, NumberInput,ImageInput, ImageField, useRecordContext } from 'react-admin';
import { useState } from 'react';






const ProductCreate = (props) => 
   { 

    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [dietaryRestrictionInput, setDietaryRestrictionInput] = useState('');
    

    const handleDietaryRestrictionsInputChange = (event) => {
        setDietaryRestrictionInput(event.target.value);
    };

    const handleAddDietaryRestriction = () => {
        if (dietaryRestrictionInput.trim()) {
            setDietaryRestrictions([...dietaryRestrictions, dietaryRestrictionInput.trim()]);
            setDietaryRestrictionInput(''); // Clear the input field
        }
    };


    const [Certifications, setCertifications] = useState([]);
    const [CertificationsInput, setCertificationsInput] = useState('');

    const handleCertificationsInputChange = (event) => {
        setCertificationsInput(event.target.value);
        console.log(CertificationsInput)
    };

    const handleAddCertifications = () => {
        console.log(Certifications)
      
            setCertifications([...Certifications, CertificationsInput.trim()]);
           
            setCertificationsInput(''); // Clear the input field
        
    };

    const [categories,setCategories]=useState([])
    const [categoriesInput, setCategoriesInput] = useState('');
    const handleCategoriesInputChange = (event) => {
        setCategoriesInput(event.target.value);
       
    };

    const handleAddCategories = () => {
        console.log(Certifications)
      
            setCategories([...categories, categoriesInput.trim()]);
           
            setCategoriesInput(''); // Clear the input field
        
    };

    const transform = (data) => ({
        ...data,
        dietaryRestrictions,
        Certifications,
        category:categories
        
    });


   
   
   
return(
   <Create {...props} transform={transform}>
        <SimpleForm >
            <div className='grid gap-x-10 w-full grid-cols-2'>
            <div className=' flex flex-col'>
            <TextInput  source="name" label="Name" />
            <TextInput  source="brand" label="Brand" />

            <NumberInput className='' source="price" label="Price" />
            <div className=''>
            <ImageInput  source="productImage" label="Upload Image">
              <ImageField source="src" title="title" />
            </ImageInput>
            </div>
            <TextInput multiline className='' source="details.Description" label="Description" />
            <TextInput multiline className='' source="details.Warnings" label="Warnings" />
            <TextInput multiline className='' source="details.More" label="More" />
           
            <TextInput  source="options" label="Options" />
            </div>

            <div className='w-full'>

                <div>
                <TextInput  multiline className='w-full'  value={categoriesInput} source="category" onChange={handleCategoriesInputChange}  label="Categories" />
                <button type='button' className='bg-black text-white font-Abel py-2 px-4' onClick={handleAddCategories}>Enter</button>

                <div className='flex my-4 flex-row gap-x-4'>
                    {
                        
                        categories.map((data,index)=>{
                            
                            return(
                                <div className='bg-gray-200 p-2' key={index} >
                                    <p className='font-Lexend'>{data}</p>
                               

                                </div>

                            )
                           
                        })
                        
                    }
                </div>
                </div>








                <TextInput  multiline className='w-full'  value={dietaryRestrictionInput} source="details.DietaryRestrictions" onChange={handleDietaryRestrictionsInputChange}  label="Dietry Restrictions" />
                <button type='button' className='bg-black text-white font-Abel py-2 px-4' onClick={handleAddDietaryRestriction}>Enter</button>

                <div className='flex my-4 flex-row gap-x-4'>
                    {
                        
                        dietaryRestrictions.map((data,index)=>{
                            
                            return(
                                <div className='bg-gray-200 p-2' key={index} >
                                    <p className='font-Lexend'>{data}</p>
                               

                                </div>

                            )
                           
                        })
                        
                    }
                </div>

                



                <div className='w-full'>
                <TextInput  multiline className='w-full'  value={CertificationsInput} source="details.Certifications" onChange={handleCertificationsInputChange}  label="Certifications" />
                <button type='button' className='bg-black text-white font-Abel py-2 px-4' onClick={handleAddCertifications}>Enter</button>

                <div className='flex my-4 flex-row gap-x-4'>
                    {
                        
                        Certifications.map((data,index)=>{
                            
                            return(
                                <div className='bg-gray-200 p-2' key={index} >
                                    <p className='font-Lexend'>{data}</p>
                               

                                </div>

                            )
                           
                        })
                        
                    }
                </div>


            </div>


            </div>

            </div>

           
            

        </SimpleForm>
    </Create>
)
}

export default ProductCreate;















