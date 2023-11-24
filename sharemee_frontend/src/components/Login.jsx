import React , { useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin,googleLogout} from '@react-oauth/google';
import shareVideo from '../assets/share.mp4';
import { FcGoogle } from 'react-icons/fc';
import blogo from '../assets/blogo.png';
import {jwtDecode as jwt_decode} from 'jwt-decode';
import { client } from '../client';


const Login = () => {
        const navigate = useNavigate();
        const responseGoogle = (response) => {

            const decode = jwt_decode(response.credential);
            console.log(decode);
            // console.log(response);
            localStorage.setItem('user', JSON.stringify(decode));
            
            const { name, sub, picture } = decode;
    
            const doc = {
                _id: sub, 
                _type: 'user',
                username: name,
                image: picture,
            }

            client.createIfNotExists(doc)
                .then(()=> {
                    navigate('/', { replace : true})
                })
    }
	return (
		<>
		  <GoogleOAuthProvider clientId= {process.env.REACT_APP_GOOGLE_API_TOKEN}>
            <div className='flex justify-start items-center flex-col h-screen'>
                <div className='relative w-full h-full'>
                    <video
                        src={shareVideo}
                        type="video/mp4"
                        loop
                        controls={false}
                        muted
                        className="h-full w-full object-cover"
                    />
                    <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                        <div className='p-5'>
                            <img src={blogo} width="130px" alt='logo' />
                        </div>
                        <div className='shadow-2xl'>
                            <GoogleLogin
                            onSuccess={(response) => responseGoogle(response)}
                            onError={()=> console.log('Error' )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
		</>
  )
}


export default Login;

