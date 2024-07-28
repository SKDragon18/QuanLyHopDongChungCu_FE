import React from "react"
import { Navigate, useLocation } from "react-router-dom"

export const RequireLogin = ({ children }) => {
	const user = localStorage.getItem("tenDangNhap")
	const location = useLocation()
	if (!user) {
		return <Navigate to="/login" state={{ path: location.pathname }} />
	}
	return children
}

export const RequireAdmin = ({ children }) => {
	const user = localStorage.getItem("tenDangNhap")
	const role = localStorage.getItem("role")
	const location = useLocation()
	if (!user||(user&&role!=='admin')) {
		return <Navigate to="/login" state={{ path: location.pathname }} />
	}
	return children
}

export const RequireQuanLy = ({ children }) => {
	const user = localStorage.getItem("tenDangNhap")
	const role = localStorage.getItem("role")
	const location = useLocation()
	if (!user||(user&&role!=='quanly')) {
		return <Navigate to="/login" state={{ path: location.pathname }} />
	}
	return children
}