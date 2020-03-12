import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import app from "./../../components/firebase/base";
import "./Summary.css";
import BarChart from "./../../components/Visualizations/BarChart";

class Sleep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 700,
      height: 200,
      id: "sleep"
    };

  }

  componentWillReceiveProps(props){
     this.setSleep(props)
  }

  // Convert points to integers and add them to the state
  setSleep(p) {
    var arr = [];
    p.temp.map(x => (arr.push(parseInt(x.q2))));
    console.log(arr);
    this.setState({
        data: arr
    })
  }


  render() {
    // Prevent the barchart from rendering until 
    // we receive all the data through props.
    if (!this.state.data || this.state.data.length < 5) {
        return <div />
    }

    return (
      <div>
        <BarChart
          data={this.state.data}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    );
  }
}

export default Sleep;
