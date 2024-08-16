import { useEffect, useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import BackgroundImage from '../assets/form.jpg'
import {LockRounded} from '@mui/icons-material'
import { useMediaQuery } from '@mui/material';


const MyLoginPage = ({  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const login = useLogin();
    const notify = useNotify();
    const md = useMediaQuery('(max-width:768px)');
    const lg = useMediaQuery('(max-width:1400px)');

    const handleSubmit = e => {
        e.preventDefault();
        login({ email, password }).catch(() =>
            notify('Invalid email or password')
        );
    };

       
   









    return (
        <div style={{width:'100%',height:'100vh',backgroundImage: `linear-gradient(to right,rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${BackgroundImage})`,backgroundPosition:'center',backgroundSize:'cover',display:'flex'}}>

       
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
    );
};










export default MyLoginPage;


