import React from 'react';
import sketch from "../../assets/images/leaderboard.png";
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';


function leaderboardsketch() {
    return(<div>
        <ButtonAppBar/>
        <img src={sketch}></img>
    </div>
    )
}

export default leaderboardsketch;