import { Show, SimpleShowLayout, TextField, DateField, RichTextField,useRecordContext } from 'react-admin';



const ImageField = ({ source }) => {
    const record = useRecordContext();
    console.log(record)
    if (!record ) return null;
    return <img className='m-auto' src={`${process.env.VITE_API_URL}/assets/news/${record.imageUrl}`} alt="" style={{ width: '800px', height: '200px' }} />;
};



export const NewsShow = (props) => (
    <Show {...props}>
 <SimpleShowLayout>
           <ImageField />
            <TextField label='ID:' source="id" />
            <TextField label='News Title:' source="title" />
            <TextField label='News Content:' source="content" />
            <TextField label='News Main Tag' source="topic" />
               
        </SimpleShowLayout>
    </Show>
);