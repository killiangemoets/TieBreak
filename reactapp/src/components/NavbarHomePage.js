import React from 'react'; 
import '../stylesheets/navbar.css'
import '../stylesheets/general.css'




function NavbarHomePage () {

    return (
        <nav className="navbar">
            <div className="navbarLeft">
                <img className="logoNavBar" src="../../ball1.png" alt='logo' />
                <h1 className="titleNavBar">TieBreak   </h1>
            </div>
            <div className="navbarRight">
                <button className='button'>SIGN IN </button>
                <button className='buttonShowed'>SIGN UP </button>
            </div>



        </nav>
    )



}

export default NavbarHomePage