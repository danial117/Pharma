import { useEffect, useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import BackgroundImage from '../assets/form.jpg'
import {LockRounded} from '@mui/icons-material'
import { useMediaQuery } from '@mui/material';
import OtpPage from '../componenets/OTP_Validation';

const MyLoginPage = ({  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp,setOtp]=useState(false)
    const apiUrl=process.env.VITE_API_URL
    
    const login = useLogin();
    const notify = useNotify();
    const md = useMediaQuery('(max-width:768px)');
    const lg = useMediaQuery('(max-width:1400px)');

    const handleSubmit = e => {
        e.preventDefault();
        fetch(`${apiUrl}/admin/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify({email:email,password:password})
        }).then((response)=>{
            
            if(response.status===200){
                console.log(response)
                setOtp(true)

            }
        }).catch(() =>
            notify('Invalid email or password')
        );
    };

       
   









    return (
       
     otp
         ?(
          <OtpPage />)
        :
      (  <div style={{width:'100%',height:'100vh',backgroundImage: `linear-gradient(to right,rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${BackgroundImage})`,backgroundPosition:'center',backgroundSize:'cover',display:'flex'}}>

       
        <form style={{background:'white', width:md?'60%':'40%',display:'flex',flexDirection:'column',gap:'20px',margin:'auto',padding:'2rem' }} onSubmit={handleSubmit}>
           
           <div style={{margin:'auto',background:'blue',borderRadius:'30px',padding:'10px'}}>
            <LockRounded style={{color:'white',fontSize:30}} />
           </div>

            <input
                style={{outline:'none',borderBottom:'2px gray solid'}}
                name="email"
                type="email"
                value={email}
                placeholder='Email'
                onChange={e => setEmail(e.target.value)}
            />
            <input
                name="password"
                style={{outline:'none',borderBottom:'2px gray solid'}}
                placeholder='Password'
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button style={{color:'white',background:'blue',padding:'4px'}}>Authorize</button>
        </form>


        
        </div>
    )
    
    );
};










export default MyLoginPage;


