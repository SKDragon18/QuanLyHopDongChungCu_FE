import React, { useEffect, useState } from 'react'
import { getLoaiPhong, insertLoaiPhong } from '../utils/ApiFunctions'

const LoaiPhongSelector = ({handleCanHoInputChange, seleted}) => {
    const[loaiPhongList, setLoaiPhongList] = useState([])
    const[isLoading,setIsLoading] = useState(true)
    const[showLoaiPhongMoiInput, setShowLoaiPhongMoiInput]= useState(false)
    const[loaiPhongMoi,setLoaiPhongMoi] = useState({
        idLoaiPhong:0,
        tenLoaiPhong:''
    })
    const fetchData = async ()=>{
        setIsLoading(true)
        try{
            const result = await getLoaiPhong()
            setLoaiPhongList(result)
            setIsLoading(false)
        }
        catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
            fetchData()
        // getLoaiPhong().then((data)=>{
        //     setLoaiPhongList(data)
        //     console.log(data)
        // })
    }, [])
    // useEffect(()=>{
    //     setIsLoading(false)
    // }, [loaiPhongList])
    const handleLoaiPhongMoiInputChange=(e)=>{
        setLoaiPhongMoi({...loaiPhongMoi, [e.target.name]:e.target.value})
    }
    const handleAddLoaiPhongMoi = ()=>{
        if(loaiPhongMoi.tenLoaiPhong !== ""){
            const fetchDataInsert = async ()=>{
                try{
                    const result = await insertLoaiPhong(loaiPhongMoi)
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
            {loaiPhongList.length >0 && (
                <div>
                    <select
                    required
                    className='form-control'
                    id='loaiPhong'
                    name='loaiPhong'
                    value={seleted}
                    onChange={(e)=>{
                        if(e.target.value === 'Add new'){
                            setShowLoaiPhongMoiInput(true)
                        }
                        else{
                            setShowLoaiPhongMoiInput(false)
                        }
                        if(e.target.value !== ''){
                            handleCanHoInputChange(e)
                        }
                    }}>
                        <option value={''}>Chọn loại phòng</option> 
                        <option value={'Add new'}>Add new</option>
                        {
                            loaiPhongList.map((val, key)=>{
                                return(
                            <option key={key} value={val.idLoaiPhong}>
                                {val.tenLoaiPhong}
                            </option>
                            )})}
                    </select>
                    {
                        showLoaiPhongMoiInput &&(
                            <div className='mt-3'>
                            <div className='input-group'>
                                <input
                                className='form-control'
                                type='text'
                                placeholder='Nhập loại phòng mới'
                                name='tenLoaiPhong'
                                value={loaiPhongMoi.tenLoaiPhong}
                                onChange={handleLoaiPhongMoiInputChange}
                                />
                                <button className='btn btn-hotel' type='button' onClick={handleAddLoaiPhongMoi}>
                                
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

export default LoaiPhongSelector
