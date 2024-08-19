import { Show, SimpleShowLayout, TextField, DateField, RichTextField,useRecordContext } from 'react-admin';





export const ContactShow = (props) => (
    <Show {...props}>
 <SimpleShowLayout>
          
            <TextField label='ID:' source="id" />
            <TextField label='Brand Name:' source="name" />
           
            
               
        </SimpleShowLayout>
    </Show>
);