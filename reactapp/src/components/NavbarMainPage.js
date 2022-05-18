import React from 'react'; 
import '../stylesheets/navbar.css'
import '../stylesheets/general.css'
import {Link}from 'react-router-dom'




function NavbarMainPage () {

    return (
        <nav className="navbar">
                <a href="/games" className="logoRedirect">
            <div className="navbarLeft ">
                <img className="logoNavBar" src="../../ball1.png" alt='logo' />
                <h1 className="titleNavBar">TieBreak   </h1>
            </div>
                </a>
            <div className="navbarRight">
                <button className='button'>Games </button>
                <button className='button'>News</button>
                <button className='buttonShowed'>Reservation </button>
                <button className='button'>Profile </button>
            </div>



        </nav>
    )



}

export default NavbarMainPage