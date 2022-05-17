import React from 'react';
import NavbarHomePage from '../components/NavbarHomePage'
import FooterPage from '../components/Footer'

import '../stylesheets/signpage.css'
import '../stylesheets/general.css'



function CreateAccount() {
    return(
        <div>
            <NavbarHomePage/> 
            <div className="container center-sign">
                <div className="center-title">
                    <div className="sign-up-title"> 
                    <p>Login</p>
                    </div>
                </div>

                <div className='login-form'> 
                    <form >
                        <div className="inputDiv">
                            <div className="login-account-form"><input placeholder="Email"></input></div>
                            <div className="login-account-form"><input placeholder="Password"></input></div>
                        </div>    
                       <div className="sign-up-sumbit-button"><button  type='submit' > SUBMIT</button> </div>                 
                    </form> 

                </div>
            </div>
        <FooterPage/>
        </div>

    )


}

export default CreateAccount; 