import React, { useEffect, useState } from 'react'
import { getDichVu } from '../utils/ApiFunctions'

const DSDichVu = () => {
    const[dichVuList,setDichVuList]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")
    useEffect(()=>{
        fetchDichVuList()
    },[])
    const fetchDichVuList = async()=>{
        setIsLoading(true)
        try{
            const result = await getDichVu()
            setDichVuList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
        }
    }
    const calculateTotalPages = (numPerPage, dichVuList)=>{
        const totalDichVu = dichVuList.length
        return Math.ceil(totalDichVu/numPerPage)
    }
    const indexOfLastDichVu = currentPage * numPerPage
    const indexOfFirstDichVu = indexOfLastDichVu - numPerPage
    const currentDichVuList = dichVuList.slice(indexOfFirstDichVu,indexOfLastDichVu)
    return (
    <>
      {isLoading?(
        <p>Loading danh sách dịch vụ</p>
      ):(
        <>
        <section className='mt-5 mb-5 container'>
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Danh sách dịch vụ</h2>
            </div>
            <Col md={6} className='mb-3 mb-md-0'>
            </Col>
        </section>
        </>
      )
      }
    </>
  )
}

export default DSDichVu
