


import { Edit, SimpleForm, TextInput} from 'react-admin';
import {useRecordContext } from 'ra-core';








const DomEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm className='w-full'>
            <TextInput source="HomePageMainBanner" />
            <TextInput multiline className='w-[50%]' source="HomePageMainBannerText.text1" />
            <TextInput multiline className='w-[50%]' source="HomePageMainBannerText.text2" />
            <TextInput source="AboutPageImage1" />
            <TextInput source="AboutPageImage2" />
            <TextInput source="AboutPageImage3" />
            <TextInput multiline className='w-[50%]' source="AboutPageImageText1.text1" />
            <TextInput multiline className='w-[50%]' source="AboutPageImageText1.text2" />
            <TextInput multiline className='w-[50%]' source="AboutPageImageText2.text1" />
            <TextInput multiline className='w-[50%]' source="AboutPageImageText2.text2" />
            <TextInput multiline className='w-[50%]' source="AboutPageImageText3.text1" />
            <TextInput multiline className='w-[50%]' source="AboutPageImageText3.text2" />
            <TextInput multiline className='w-[50%]' source="SignUpPageText.text1" />
            <TextInput multiline className='w-[50%]' source="SignUpPageText.text2" />
            <TextInput source="SignUpPageImage" />
            </SimpleForm>
        </Edit>
    );
};


export default DomEdit;