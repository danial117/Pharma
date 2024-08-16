
import { Create, SimpleForm, TextInput,ImageField,ImageInput } from 'react-admin';







const BrandsCreate = (props) => 
   { 

    const transform = (data) => ({
        ...data
        
    });
   
   
return(
   <Create {...props} transform={transform} >
        <SimpleForm >
           
            <TextInput  source="name" label="Name" />
                <div className=''>
            <ImageInput  source="brandImage" label="Upload Image">
              <ImageField source="src" title="title" />
            </ImageInput>
            </div>
           
            
           

           
           
            

        </SimpleForm>
    </Create>
)
}

export default BrandsCreate;















