
import { Create, SimpleForm, TextInput, NumberInput,ImageInput, ImageField, useRecordContext } from 'react-admin';
import { useState } from 'react';






const NewsCreate = (props) => 
   { 

   

    const transform = (data) => ({
        ...data,
       
        
    });


   
   
   
return(
   <Create {...props} transform={transform}>
        <SimpleForm >
            <div className='grid gap-x-10 w-full grid-cols-2'>
            <div className=' flex flex-col'>
            <TextInput  source="newsTitle" label="News Title" />
            <ImageInput  source="newsImage" label="Upload Image">
              <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput  source="newsContent" label="News Content" />
            <TextInput  source="newsMainTag" label="News Main Tag" />

            
           
            </div>





     

          

          

            </div>

           
            

        </SimpleForm>
    </Create>
)
}

export default NewsCreate;



