import { Paper } from '@material-ui/core';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

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