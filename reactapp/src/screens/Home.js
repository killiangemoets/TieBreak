import React from 'react'; 
import NavbarHomePage from '../components/NavbarHomePage'
import FooterPage from '../components/Footer'
import '../stylesheets/homepage.css'


function Home() {
    return (
        <div>
        <NavbarHomePage/>
            <div > 
                <div className="firstPage">
                   <div className="leftContainer">
                        <div className="header">
                            <hr className="horizontalRule"></hr>
                            <h1 id='title' > TieBreak</h1>
                            <hr className="horizontalRule"></hr>
                        </div>
                        <div>
                            <p className="header-description"> 
                                The ultimate website to book <br/> 
                                your tennis session! 
                            </p>
                        </div>
                        <div className="homePageButton">
                            <button className="yellowButton"> Get Started</button>  
                            <button className="yellowButton"> Learn More</button>
                        </div>
                    </div> 
                    <div className="rightContainer" >
                        <img src='../../tennis-header.png' alt="tennismanwomen">
                        </img>
                    </div>
                </div>

            </div>
        <FooterPage/>
        </div>
    )
}

export default Home;