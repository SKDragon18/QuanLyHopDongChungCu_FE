import React from "react"
import { Navigate, useLocation } from "react-router-dom"

const RequireLogin = ({ children }) => {
	const user = localStorage.getItem("tenDangNhap")
    console.log(user)
	const location = useLocation()
	if (!user) {
		return <Navigate to="/login" state={{ path: location.pathname }} />
	}
	return children
}
export default RequireLogin