import React from 'react';
import sketch from "../../assets/images/interests.png";
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';


function interestsSketch() {
    return(<div>
        <ButtonAppBar/>
        <img src={sketch}></img>
    </div>
    )
}

export default interestsSketch;