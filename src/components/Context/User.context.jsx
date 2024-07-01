import { createContext, useState } from "react";

 export const Usercontext = createContext(""); 
 export default function UserProvider({children}){
    const [token , SetToken] = useState(localStorage.getItem("token"));
    function logout()
    {
        SetToken(null)
        localStorage.removeItem("token")
    }
    return <Usercontext.Provider value={{token ,SetToken ,logout }}>
        {children}
    </Usercontext.Provider>
}