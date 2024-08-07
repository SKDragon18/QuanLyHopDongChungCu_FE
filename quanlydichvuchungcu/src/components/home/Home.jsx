import React from 'react'
import MainHeader from '../layout/MainHeader'
import DichVuChungCu from '../common/DichVuChungCu'
import Parallax from '../common/Parallax'
import CanHoCarousel from '../common/CanHoCarousel'
import DichVuCarousel from '../common/DichVuCarousel'
const Home = () => {
  return (
    <section>
      <MainHeader/>
      <section className='container'>
        <CanHoCarousel/>
        <Parallax/>
        <CanHoCarousel/>
        <DichVuChungCu/>
        <Parallax/>
        <DichVuCarousel/>
      </section>
    </section>
  )
}

export default Home
