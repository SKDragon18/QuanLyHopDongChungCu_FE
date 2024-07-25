import React, { createContext, useContext, useState } from 'react'
import { Children } from 'react'

export const AuthContext = createContext({
    user:null,
    handleLogin:(tenDangNhap, role, token)=>{},
    handleLogout:()=>{}
})

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const handleLogin = (data)=>{
        localStorage.setItem("tenDangNhap", data.tenDangNhap)
        localStorage.setItem("role", data.quyen.tenQuyen)
        localStorage.setItem("token",data.token)
        setUser(data)
    }
    const handleLogout = ()=>{
        localStorage.removeItem("tenDangNhap")
        localStorage.removeItem("role")
        localStorage.removeItem("token")
        setUser(null)
    }
  return (
    <AuthContext.Provider value={{user, handleLogin, handleLogout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export const useAuth = () =>{
    return useContext(AuthContext)
}
