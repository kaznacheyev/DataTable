import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import Table from './Table';

import dataSmall from '../data/small.json'
import dataBig from '../data/big.json'

class App extends React.Component {

  state = {
    data: null
  }

  loadData = (id) => {
    if (id === 1) {
      this.setState({data: dataSmall})
    } else if (id === 2) {
      this.setState({data: dataBig})
    }
  }

  render() {
    let { data } = this.state;
    console.log(data)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to DataTable</h1>
        </header>
        {data === null ?
            <React.Fragment>
              <button onClick={() => this.loadData(1)}>Loda small data</button>
              <button onClick={() => this.loadData(2)}>Loda big data</button>
            </React.Fragment>
          :
            <Table title={data.shift()} data={data}/>
          }
      </div>
    );
  }
}

export default App;
