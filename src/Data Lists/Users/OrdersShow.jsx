import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const UserShow = (props) => (
    <Show {...props}>
 <SimpleShowLayout>
            <TextField label='ID:' source="id" />
            <TextField label='User Name:' source="name" />
            <TextField label='User Email:' source="email" />
            <TextField label='Authentication Method:' source="authenticationMethod" />
            <TextField label='google ID:' source="googleId" />
            <TextField label='Admin' source="isAdmin" />
     
        </SimpleShowLayout>
    </Show>
);