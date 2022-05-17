import React from 'react'; 
import NavbarHomePage from '../components/NavbarHomePage'
import FooterPage from '../components/Footer'
import '../stylesheets/homepage.css'
import '../stylesheets/general.css'


function Home() {
    return (
        <div>
            <NavbarHomePage/>
            <div className="container"> 
                <div className="header">
                   <div className="leftContainer">
                        <div className="header-title">
                            <hr className="horizontalRule"></hr>
                            <img className="ball-in-title" src="../../ball1.png" alt="ball" />
                            <h1 id='title'> TieBreak</h1>
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
                <div className="howItWorks-section">
                    <div className="titleTexts"> 
                        <div className="title-howItWorks"> 
                            <p> How it Works </p>
                        </div>
                        <div className="text-howItWorks"> 
                            <p> Finding an available tennis court has never been so easy ! </p>
                        </div>
                    </div>
                    <div className="box-section"> 
                        <div className="boxTemplate">
                            <div className="boxText"> 
                                <div className="boxText-title">
                                    <p> 15-0</p>
                                </div>
                                <div className="boxText-description">
                                    <p>Chose the perfect time in <br/>
                                        the calendar!</p>
                                </div>
                            </div>
                            <div className="boxElement">
                                <img src="../../calandar.png" alt="calendar"> 
                                </img>
                            </div>
                        </div>
                        <hr className="divideBoxes"></hr>
                        <div className="boxTemplate">
                            <div className="boxElement">
                                <img src="../../map.jpeg" alt="calendar"> 
                                </img>
                            </div>
                            <div className="boxText"> 
                                <div className="boxText-title">
                                    <p> 30-0</p>
                                </div>
                                <div className="boxText-description">
                                    <p>Chose the perfect <br/>
                                        tennis court!</p>
                                </div>
                            </div>
                        </div>
                        <hr className="divideBoxes"></hr>
                        <div className="boxTemplate">
                            <div className="boxText"> 
                                <div className="boxText-title">
                                    <p> 40-0</p>
                                </div>
                                <div className="boxText-description">
                                    <p>Confirm & Pay</p>
                                </div>
                            </div>
                            <div >
                                <img className="boxElementMaria" src="../../cf25de0e2cacb54159d6f51fa00e042b.png" alt="calendar"> 
                                </img>
                            </div>
                        </div>
                        <div className="gameSetMatchButton">
                            <button className="yellowButton-final"> Game - Set & Match</button>
                        </div>
                    
                    
                    </div>

                </div>
            </div>
            <FooterPage/>
        </div>
    )
}

export default Home;