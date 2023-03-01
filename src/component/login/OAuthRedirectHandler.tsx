import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/actions/user';

const OAuthRedirectHandler = () => {

  interface UserType {
    jwtToken: string;
    email: string;
    name: string;
    phone: string;
    id: string;

}

    const search = useLocation().search;
    const jwtToken = new URLSearchParams(search).get('token');
    const name = new URLSearchParams(search).get('name');
    const phone = new URLSearchParams(search).get('phone');
    const email = new URLSearchParams(search).get('email');
    const id = new URLSearchParams(search).get('id');

  
    const error = new URLSearchParams(search).get('error');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user: UserType = {
      jwtToken: jwtToken? jwtToken : "",
      email: email? email : "",
      name: name? name : "",
      phone: phone? phone : "",
      id: id? id : "",
    }
    
    console.log("here");
    
    useEffect(() => {
      if (jwtToken) {
        dispatch(setCurrentUser(user));       
        navigate("/");
      } else {
        navigate("/login",{ state: {
          success: false,
          message: error
        }});
      }   
     
    }, [])
    
    
    return (
    <div>
        Processing ....
    </div>
  )
}

export default OAuthRedirectHandler