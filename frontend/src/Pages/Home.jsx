import React,{lazy} from 'react'

const Navbar =lazy(()=> import("../Components/Navbar"))
const Homebook=lazy(()=> import("../Components/Home"))

const Home = () => {
  return (
<div>
  <Navbar/>
    <div>
      <Homebook/>
    </div>
</div>
  )
}

export default Home