import { Show, SimpleShowLayout, TextField, DateField, RichTextField,useRecordContext } from 'react-admin';





export const ContactShow = (props) => (
    <Show {...props}>
 <SimpleShowLayout>
          
            <TextField label='ID:' source="id" />
            <TextField label='User Name:' source="name" />
            <TextField label='User Email:' source="email" />
            <TextField label='User Message:' source="message" />
           
            
               
        </SimpleShowLayout>
    </Show>
);