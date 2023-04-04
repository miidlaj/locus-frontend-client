import React from 'react'
import { useDispatch } from 'react-redux';
import { clearCurrentUser } from '../../store/actions/user';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    React.useEffect(() => {
      dispatch(clearCurrentUser());
      navigate("/login"); 
    }, [])
    
  return (
    <></>
  )
}

export default LogoutPage