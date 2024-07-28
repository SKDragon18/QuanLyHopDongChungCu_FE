import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
const SimpleDialog = ({open,setOpen, handle, message}) => {
const handleClose=(result)=>{
    if(result==='ok'){
        handle()
    }
    setOpen(false)
    }
  
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Xác nhận {message}?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>handleClose('cancel')} color='primary'>
            Hủy
            </Button>
            <Button onClick={()=>handleClose('ok')} color='primary' autoFocus>
            Xác nhận
            </Button>
        </DialogActions>
        </Dialog>
    </>
  )
}

export default SimpleDialog
