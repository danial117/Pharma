import { Show, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';

export const DOM_Show = (props) => (
    <Show {...props}>
 <SimpleShowLayout>
 <TextField  source="id" />
            <TextField source="HomePageMainBanner" />
            <TextField source="HomePageMainBannerText.text1" />
            <TextField source="HomePageMainBannerText.text2" />
            <TextField source="AboutPageImage1" />
            <TextField source="AboutPageImage2" />
            <TextField source="AboutPageImage3" />
            <TextField source="AboutPageImageText1.text1" />
            <TextField source="AboutPageImageText1.text2" />
            <TextField source="AboutPageImageText2.text1" />
            <TextField source="AboutPageImageText2.text2" />
            <TextField source="AboutPageImageText3.text1" />
            <TextField source="AboutPageImageText3.text2" />
            <TextField source="SignUpPageText.text1" />
            <TextField source="SignUpPageText.text2" />
            <TextField source="SignUpPageImage" />
            

            
        </SimpleShowLayout>
    </Show>
);