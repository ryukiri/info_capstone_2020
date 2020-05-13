import "./Summary.css";

import React, { Component } from "react";

import BarChart from "./../../components/Visualizations/BarChart";

class Banana extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 700,
      height: 200,
      id: "banana"
    };

  }

  componentWillReceiveProps(props){
     this.setBanana(props)
  }

  // Convert points to integers and add them to the state
  setBanana(p) {
    var arr = [];
    p.temp.map(x => (arr.push(parseInt(x.q1))));
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

export default Banana;
