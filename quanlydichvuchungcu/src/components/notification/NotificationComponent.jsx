import React, { useEffect, useState } from 'react'
import {Client} from '@stomp/stompjs'
import { notify, notifyBanQuanLy } from '../utils/ApiFunctions'
import { Button, Container, NavLink, Row } from 'react-bootstrap'
const NotificationComponent = ({tenDangNhap, role}) => {
  const [notificationsList, setNotificationsList] = useState([])
    useEffect(()=>{
        const fetchNotifications = async()=>{
          try{
            if(role==='khachhang'){
              const result = await notify(tenDangNhap)
              setNotificationsList(result)
            }
            else if(role==='quanly'){
              const result = await notifyBanQuanLy()
              setNotificationsList(result)
            }
          }
          catch(error){
            console.log(error.message)
          }
        }
        const interval = setInterval(fetchNotifications,30000)
        fetchNotifications()
        return ()=> clearInterval(interval)
    },[tenDangNhap])
  return (
    <NavLink>
      {notificationsList.length===0&&(
        <Button type='button' className='btn btn-light' onClick={()=>{
          alert("Bạn không có thông báo mới")
        }}>
          🔔
        </Button>
      )}
      {notificationsList.length>0&&(
        <Button type='button' className='btn btn-danger' onClick={()=>{
          alert(notificationsList.join('\n'))
        }}>
          🔔{notificationsList.length}
        </Button>
      )}
      
    </NavLink>
  )
}

export default NotificationComponent
