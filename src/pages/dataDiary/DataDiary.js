import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import './DataDiary.css';

function DataDiary() {
  return (
    <div>
      <ButtonAppBar/>
      <Typography variant="h3">
        Data Diary
      </Typography>
    </div>
  );
}

export default DataDiary;
