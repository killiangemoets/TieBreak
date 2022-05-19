import React, {useState, useEffect} from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/games.css";
import "../stylesheets/general.css";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';

function Home(props) {

    const [gameList, setGameList] = useState([])
    const [switchToggled, setSwitchToggled] = useState(false)
    


    const toggleSwitch = () => {
      switchToggled ? setSwitchToggled(false) : setSwitchToggled(true)
    }
    
    useEffect(() => {
      async function matchData() {
        // C'est un GET par défaut le fetch
        // var rawResponse = await fetch(`users/games/${props.token}`)
        var rawResponse = await fetch('users/games/wvkwrx')
        // On récupère le token grace à REDUX
        var response = await rawResponse.json()
        console.log(response)
        setGameList(response.data.games)

      }
      matchData()
    }, [])

    function renderGames(gameList) {
    var info = gameList.map((game) => {
      var date = new Date(game.date)
      var day = date.getDay()
      var month = date.getMonth()
      var year = date.getFullYear()
      var fullDate = `${day}/${month}/${year}`
      


    if(date < new Date() && switchToggled === true  ){

        return(
          <div className="game-card">
            <div>
              <h6 className="game-info">{game.day} {fullDate}</h6>
            </div>
            <div>
              <h6 className="game-info">{game.time}:00 - {+game.time+1}:00
               </h6>
            </div>
            <div>
              <h6 className="game-info">{game.club}</h6>
            </div>
            <div>
              <h6 className="game-info">{game.price} €</h6>
            </div>
          </div>
  
          ) 

      } else if (date > new Date() && switchToggled === false){
        return(
          <div className="game-card">
            <div>
              <h6 className="game-info">{game.day} {fullDate}</h6>
            </div>
            <div>
              <h6 className="game-info">{game.time}:00 - {+game.time+1}:00
               </h6>
            </div>
            <div>
              <h6 className="game-info">{game.club}</h6>
            </div>
            <div>
              <h6 className="game-info">{game.price} €</h6>
            </div>
          </div>
          ) 
      }
    }) 
    return info
    } 

  
  // if (props.token === '') {
  //   return <Redirect to='/signin' />
  // } else {
  
  return (
    <div>
      <NavbarMainPage />
      <div className="games-section">
        <div className="start-reservation-btn-section">
          <button className="yellowButton start-reservation-big-btn">
            Start a Reservation
          </button>
        </div>
        <div className="stats-section container center-stats">
          <div className="stats">
            <div className="stat">
              <h5 className="stat-title">Total Games Played:</h5>
              <h5 className="stat-value">{gameList.length}</h5>
            </div>
            <div className="stat">
              <h5 className="stat-title">Favorite Club:</h5>
              <h5 className="stat-value">RTC Aywaille</h5>
            </div>
            <div className="stat">
              <h5 className="stat-title">Total Games Played This Month:</h5>
              <h5 className="stat-value">3</h5>
            </div>
            <div className="stat">
              <h5 className="stat-title">Favorite Club of The Month:</h5>
              <h5 className="stat-value">TC Bruxelles</h5>
            </div>
          </div>
        </div>
        <div className="games">
          <div className="container center-games">
            <div className="games-titles">
              <div>
                <h2 className={switchToggled ? "games-title" : "games-title active-games-title"} onClick={() => setSwitchToggled(false)}>Coming Games</h2>
              </div>
              <div>
                <div className="games-titles-background" onClick={toggleSwitch}>
                  <div  className={switchToggled ? "games-titles-tennisball previous" : "games-titles-tennisball coming"} >
                    <img
                      className="tennisball-img"
                      src="../../ball1.png"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
              <h2 className={switchToggled ? "games-title active-games-title" : "games-title"} onClick={() => setSwitchToggled(true)}>Previous Games</h2>
            </div>
            <div className="games-list">
              {/* {info}    */}
              {renderGames(gameList)}
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}
// }
function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(
  mapStateToProps
)(Home);
