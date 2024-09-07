import React, { useState } from 'react';
import { Edit, SimpleForm, Toolbar, SaveButton,useRecordContext,TextInput } from 'react-admin';
import DashedImage from '../../componenets/DashedImage';
import EditableText from '../../componenets/EditText';
import AD from '../../assets/Ad.png';


const CMS_Create = (props) => {
  const [imageFiles, setImageFiles] = useState({});
  

  const [texts, setTexts] = useState({});

  const handleFileChange = (id, file) => {
    setImageFiles((prevFiles) => ({
      ...prevFiles,
      [id]: file,
    }));
  };

  const handleTextChange = (id, updatedRecord) => {
    setTexts((prevTexts) => ({
      ...prevTexts,
      [id]: updatedRecord,
    }));
  };

  const transform = (data) => {
    const formData = new FormData();

    // Add text fields to formData
    Object.keys(imageFiles).forEach((id) => {
      const file = imageFiles[id];
      if (file) {
        formData.append(id, file);
      }
    });
    
      


     


      Object.keys(texts).forEach((id) => {
        console.log(texts)
        const textData = texts[id];
        if (id === 'main-banner' || id === 'ad-banner') {
          formData.append('HomePageMainBannerText[text1]', textData['HomePageMainBannerText']?.text1);
          formData.append('HomePageMainBannerText[text2]', textData['HomePageMainBannerText']?.text2);
        }
      })


      Object.keys(texts).forEach((id) => {
        console.log(texts)
        const textData = texts[id];
        if (id === 'main-banner' || id === 'ad-banner') {
          formData.append('HomePageMainBannerText[text1]', textData['HomePageMainBannerText']?.text1);
          formData.append('HomePageMainBannerText[text2]', textData['HomePageMainBannerText']?.text2);
        }else if(id === 'main-about1' || id === 'about1'){
          formData.append('AboutPageImageText1[text1]', textData['AboutPageImageText1']?.text1);
          formData.append('AboutPageImageText1[text2]', textData['AboutPageImageText1']?.text2);
        }else if(id === 'main-about2' || id === 'about2'){
          formData.append('AboutPageImageText2[text1]', textData['AboutPageImageText2']?.text1);
          formData.append('AboutPageImageText2[text2]', textData['AboutPageImageText2']?.text2);
        }else if(id === 'main-about3' || id === 'about3'){
          formData.append('AboutPageImageText3[text1]', textData['AboutPageImageText3']?.text1);
          formData.append('AboutPageImageText3[text2]', textData['AboutPageImageText3']?.text2);
        }
      })



      Object.keys(texts).forEach((id) => {
        console.log(texts)
        const textData = texts[id];
        if (id === 'footer-email' ) {
          formData.append('FooterContent[email]', textData['FooterContent']?.email);
          
        }else if(id === 'footer-facebook-link' ){
          
          formData.append('FooterContent[facebookLink]', textData['FooterContent']?.facebookLink);
        }else if(id === 'footer-twitter-link' ){
        
          formData.append('FooterContent[twitterLink]', textData['FooterContent']?.twitterLink);
        }else if(id === 'footer-youtube-link' ){
        
          formData.append('FooterContent[youtubeLink]', textData['FooterContent']?.youtubeLink);
        }else if(id === 'footer-instagram-link' ){
        
          formData.append('FooterContent[instagramLink]', textData['FooterContent']?.instagramLink);
        }
      })




   

    return formData;
  };

  const BrandEditToolbar = () => (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <SaveButton alwaysEnable />
    </Toolbar>
  );

  return (
    <Edit {...props} transform={transform}>
      <SimpleForm toolbar={<BrandEditToolbar />}>
        <div className='h-auto flex flex-col gap-y-64 p-8 w-full'>



          <div>
          <p className='font-Lexend text-[2rem]'>Home Page Main Content:</p>
          <div className='my-8 flex flex-col gap-y-8'>
            <div className='h-auto w-full'>
           
              <DashedImage
                source='HomePageAdBanner'
                alt="AD Banner"
                id="HomePageAdBanner"
                className="w-full h-[300px]"
                onFileChange={handleFileChange}
              />
            </div>

            <div className='h-auto w-full '>
              <DashedImage
                source='HomePageMainBanner'
                alt="Form Banner"
                id="HomePageMainBanner"
                className="w-full h-[300px] "
                onFileChange={handleFileChange}
                
              />
              <div className=''>
              <EditableText
                  id="ad-banner"
                  source='HomePageMainBannerText.text1'
                  style={{ fontSize: '1rem' }}
                 
                  className="font-Lexend text-[2rem] "
                  onChange={handleTextChange}
                />
                <EditableText
                  id="main-banner"
                  style={{  fontSize: '1rem' }}
                 
                  className="font-Lexend "
                  onChange={handleTextChange}
                  source='HomePageMainBannerText.text2'
                />
             
              </div>
            </div>
          </div>
          </div>











        <div>
          <div className='my-8 flex flex-col gap-y-8'>
          <div>
       <p className='font-Lexend text-[2rem]'>About Page Main Content:</p>
       </div>
       <div className='flex flex-col gap-y-32'>
            <div className='h-auto w-full'>
           
              <DashedImage
                source='AboutPageImage1'
                alt="AD Banner"
                id="AboutPageImage1"
                className="w-full h-[300px]"
                onFileChange={handleFileChange}
              />
               <div className=''>
              <EditableText
                  id="main-about1"
                  source='AboutPageImageText1.text1'
                  style={{ fontSize: '1rem' }}
                  initialText={texts['ad-banner']}
                  className="font-Lexend text-[2rem] "
                  onChange={handleTextChange}
                />
                <EditableText
                  id="about1"
                  style={{  fontSize: '1rem' }}
                  initialText={texts['main-banner']}
                  className="font-Lexend "
                  onChange={handleTextChange}
                  source='AboutPageImageText1.text2'
                />
             
              </div>
            </div>







            <div className='h-auto w-full '>
              <DashedImage
                source='AboutPageImage2'
                alt="Form Banner"
                id="AboutPageImage2"
                className="w-full h-[300px] "
                onFileChange={handleFileChange}
                
              />
              <div className=''>
              <EditableText
                  id="main-about2"
                  source='AboutPageImageText2.text1'
                  style={{ fontSize: '1rem' }}
                 
                  className="font-Lexend text-[2rem] "
                  onChange={handleTextChange}
                />
                <EditableText
                  id="about2"
                  style={{  fontSize: '1rem' }}
                  initialText={texts['main-banner']}
                  className="font-Lexend "
                  onChange={handleTextChange}
                  source='AboutPageImageText2.text2'
                />
             
              </div>
            </div>





            <div className='h-auto w-full '>
              <DashedImage
                source='AboutPageImage3'
                alt="Form Banner"
                id="AboutPageImage3"
                className="w-full h-[300px] "
                onFileChange={handleFileChange}
                
              />
              <div className=''>
              <EditableText
                  id="main-about3"
                  source='AboutPageImageText3.text1'
                  style={{ fontSize: '1rem' }}
                  initialText={texts['ad-banner']}
                  className="font-Lexend text-[2rem] "
                  onChange={handleTextChange}
                />
                <EditableText
                  id="about3"
                  style={{  fontSize: '1rem' }}
                  initialText={texts['main-banner']}
                  className="font-Lexend "
                  onChange={handleTextChange}
                  source='AboutPageImageText3.text2'
                />
             
              </div>
            </div>
















            <div>
          <div className='my-8 flex flex-col gap-y-8'>
          <div>
       <p className='font-Lexend text-[2rem]'>Footer Content:</p>
       </div>
       <div className='flex flex-col gap-y-32'>

            <div className='h-auto w-full '>


            <EditableText
                  id="footer-email"
                  source='FooterContent.email'
                  style={{ fontSize: '1rem' }}
                  initialText={texts['footer-email']}
                  className="font-Lexend text-[2rem] "
                  onChange={handleTextChange}
                />
                <EditableText
                  id="footer-facebook-link"
                  style={{  fontSize: '1rem' }}
                  initialText={texts['main-banner']}
                  className="font-Lexend "
                  onChange={handleTextChange}
                  source='FooterContent.facebookLink'
                />
                  <EditableText
                  id="footer-youtube-link"
                  style={{  fontSize: '1rem' }}
                  initialText={texts['main-banner']}
                  className="font-Lexend "
                  onChange={handleTextChange}
                  source='FooterContent.youtubeLink'
                />
                  <EditableText
                  id="footer-twitter-link"
                  style={{  fontSize: '1rem' }}
                  initialText={texts['main-banner']}
                  className="font-Lexend "
                  onChange={handleTextChange}
                  source='FooterContent.twitterLink'
                />
                  <EditableText
                  id="footer-instagram-link"
                  style={{  fontSize: '1rem' }}
                  initialText={texts['main-banner']}
                  className="font-Lexend "
                  onChange={handleTextChange}
                  source='FooterContent.instagramLink'
                />
                







            </div>
            </div>
            </div>
            </div>

















































            </div>

















          </div>
          </div>





























      













        </div>
      </SimpleForm>
    </Edit>
  );
};

export default CMS_Create;





