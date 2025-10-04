import { useState } from 'react'
import './navBar.css'
function NavBar({score}) {

  return (
    <div className="navBarLeft">
        <img src="/dollar.png" alt="" />
        <p>  : {score}</p>
    </div>
  )
}
export default NavBar
