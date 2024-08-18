import { Show, SimpleShowLayout, TextField, DateField, RichTextField,useRecordContext } from 'react-admin';





export const ContactShow = (props) => (
    <Show {...props}>
 <SimpleShowLayout>
          
            <TextField label='ID:' source="id" />
            <TextField label='News Title:' source="name" />
            <TextField label='News Content:' source="email" />
            <TextField label='News Main Tag' source="message" />
               
        </SimpleShowLayout>
    </Show>
);