import React,{lazy} from 'react'

const Navbar =lazy(()=> import("../Components/Navbar"))

const Home = () => {
  return (
<div>
  <Navbar/>
    <div>Home</div>
</div>
  )
}

export default Home