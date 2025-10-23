import React from 'react'
import './Navbar.css'
import Fire from '../../assets/emoji/fire.jpg'
import Star from '../../assets/emoji/star.jpg'
import Party from '../../assets/emoji/party.jpg'

function Navbar() {
  return (
    <nav className='navbar'>
<h1>MovieBox</h1>
<div className='navbar_link'>

    <a href="">Popular 

        
        <img className='emoji' src={Fire} alt="fire" />
    
     </a>

     <a href="">Upcoming Movies 
        
        <img className='emoji' src={Party} alt="party" />
     
     
      </a>

      <a href="">Most Rated
        
        <img className='emoji' src={Star} alt="star" />
        
         </a>
</div>


    </nav>
  )
}

export default Navbar