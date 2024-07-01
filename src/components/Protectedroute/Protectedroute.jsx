import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Usercontext } from '../Context/User.context';

export default function Protectedroute({children}) {
 const {token} = useContext(Usercontext) 
    if(token){
        return children ;
    }else{
        return <Navigate to="/auth/login"/>
    }

}
