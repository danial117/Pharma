import { Show, SimpleShowLayout, TextField,useRecordContext } from 'react-admin';



const ImageField = ({ source }) => {
    const record = useRecordContext();
    console.log(record)
    if (!record ) return null;
    return <img className='m-auto' src={`${process.env.VITE_API_URL}/assets/brands/${record.brandLogoPath}`} alt="" style={{ width: '800px', height: '200px' }} />;
};



export const BrandShow = (props) => (
    <Show {...props}>
 <SimpleShowLayout>
           <ImageField />
           
            <TextField  label='Brand Name:' source="name" />
          
           
        </SimpleShowLayout>
    </Show>
);