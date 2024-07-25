import React, { useEffect, useState } from 'react'
import { getQuyen, insertQuyen } from '../utils/ApiFunctions'

const QuyenSelector = ({handleInputChange, seleted}) => {
    const[quyenList, setQuyenList] = useState([])
    const[isLoading,setIsLoading] = useState(true)
    const[showQuyenMoiInput, setShowQuyenMoiInput]= useState(false)
    const[quyenMoi,setQuyenMoi] = useState({
        idQuyen:0,
        tenQuyen:''
    })
    const fetchData = async ()=>{
        setIsLoading(true)
        try{
            const result = await getQuyen()
            setQuyenList(result)
            setIsLoading(false)
        }
        catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
            fetchData()
        // getQuyen().then((data)=>{
        //     setQuyenList(data)
        //     console.log(data)
        // })
    }, [])
    // useEffect(()=>{
    //     setIsLoading(false)
    // }, [quyenList])
    const handleQuyenMoiInputChange=(e)=>{
        setQuyenMoi({...quyenMoi, [e.target.name]:e.target.value})
    }
    const handleAddQuyenMoi = ()=>{
        if(quyenMoi.tenQuyen !== ""){
            const fetchDataInsert = async ()=>{
                try{
                    const result = await insertQuyen(quyenMoi)
                    console.log(result)
                    if(result!==false){
                        fetchData()
                    }
                    else{

                    }
                }
                catch(error){
                    console.log(error.message)
                }
            }
            fetchDataInsert()
        }
    }
    if(isLoading) return (<>
        <div>
        <input
            className='form-control'
            readOnly
            value='Loading...'/>
        </div>
    </>)
    return (
        <>
            {quyenList.length >0 && (
                <div>
                    <select
                    required
                    className='form-control'
                    id='idQuyen'
                    name='idQuyen'
                    value={seleted}
                    onChange={(e)=>{
                        if(e.target.value === 'Add new'){
                            setShowQuyenMoiInput(true)
                        }
                        else{
                            setShowQuyenMoiInput(false)
                        }
                        if(e.target.value !== ''){
                            handleInputChange(e)
                        }
                    }}>
                        <option value={''}>Chọn quyền</option> 
                        <option value={'Add new'}>Add new</option>
                        {
                            quyenList.map((val, key)=>{
                                if(val.tenQuyen!=="khachhang"){
                                    return(<option key={key} value={val.idQuyen}>
                                        {val.tenQuyen}
                                    </option>)
                                }
                                
                            })
                        }
                    </select>
                    {
                        showQuyenMoiInput &&(
                            <div className='mt-3'>
                            <div className='input-group'>
                                <input
                                className='form-control'
                                type='text'
                                placeholder='Nhập tên quyền mới'
                                name='tenQuyen'
                                value={quyenMoi.tenQuyen}
                                onChange={handleQuyenMoiInputChange}
                                />
                                <button className='btn btn-hotel' type='button' onClick={handleAddQuyenMoi}>
                                
                                    Add
                                </button>
                            </div>
                            </div>
                        )
                    }
                </div>
            )}
        </>
    )
}

export default QuyenSelector
