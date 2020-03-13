import React from 'react';
import sketch from "../../assets/images/signup.png";
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';


function signUpSketch() {
    return(<div>
        <ButtonAppBar/>
        <img src={sketch}></img>
    </div>
    )
}

export default signUpSketch;