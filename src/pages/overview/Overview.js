import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBar';
import './Overview.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '50px',
  },
  root3: {
    paddingRight: '50px',
    paddingLeft: '50px',
    paddingBottom: '50px',
  },
  featurePage: {
    backgroundColor: "#303C6C"
  },
  feature: {
    maxWidth: '200px',
    textAlign: 'center',
  },
  featureContainer: {
    justifyContent: 'space-around',
    padding: '50px',
  },
  icon: {
    padding: '20px',
    fontSize: '100px',
    color: '#F4976C',
  },
  aboutPage: {
    padding: '30px',
    fontWeight: 'bold',
    color: '#F4976C',
  },
  featureTitle: {
    paddingTop: '30px',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  featureText: {
    color: '#FFFFFF',
  },
  dataIcon: {
    maxWidth: '400px',
  },
  definitionTitle: {
    paddingBottom: '60px',
    fontWeight: 'bold',
    color: '#B4DFE5'
  },
  statHighlight: {
    color: '#F4976C',
    fontWeight: 'bold',
    fontSize: '38pt'
  },
  statBody: {
    textAlign: 'left',
    maxWidth: "200px"
  },
  body2: {
    fontSize: "14pt",
    color: "#303C6C",
  },
  personIcon: {
    maxWidth: '40px'
  },
  problemContainer: {
    maxWidth: "200px"
  },
  problem2Container: {
    maxWidth: "400px"
  },
  header: {
    margin: 'auto',
    padding: theme.spacing(8),
    paddingTop: theme.spacing(12)
  },
  titleText: {
    fontWeight: 'bold',
    color: '#D2FDFF'
  },
  button: {
    backgroundColor: '#303C6C',
    color:'#FFF'
  }

}));


function Overview() {
  const [graphicData, setGraphicData] = useState([{ y: 0 }, { y: 100 }]);
  useEffect(() => {
    setGraphicData([{ x: " ", y: 86 }, {  x: " ", y: 14 }]); // Setting the data that we want to display
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <ButtonAppBar/>
      <Typography variant="h1">
        OVERVIEW PAGE
      </Typography>
    </div>
  );
}

export default Overview;
