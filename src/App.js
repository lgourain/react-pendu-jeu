import React, { Component } from 'react';
import './App.css';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

class App extends Component {
  constructor() {
    super()
    this.state = {
      lettre: "",
      lettresUtilises: "",
      motADeviner: "",
      motDevine: "",
    }
  }
  handleClick(lettre) {
    console.log(lettre, 'clicked')
  }
  render() {
    return (
      <div className="container">
        <div className="masque">
          <p>MASQUE TEST</p>
        </div>
        <div className="boutons">
          {
            alphabet.map((lettre, index) => {
              return (
                <button key={index} onClick={() => this.handleClick(lettre)}>{lettre}</button>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
