import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';

export default ({ categories, category, onSelect }) => {

  const index = category
  ? categories.findIndex(group => group === category) + 1
  : 0

  const onIndexSelect = (e, index) => {
    onSelect(index === 0 ? '' : categories[index - 1])
  }
  
  return <Paper>
   <Tabs 
      value={index}
      onChange={onIndexSelect} 
      indicatorColor="secondary"
      textColor="secondary"
      centered>
        <Tab label="All" />
        {categories.map(group =>
          <Tab label={group} />  
        )}
      </Tabs>
 </Paper>
}