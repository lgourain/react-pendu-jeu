import React, { Component } from 'react';
import './App.css';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
const mots = [
  "ANGLE",
  "ARMOIRE",
  "BANC",
  "BUREAU",
  "CABINET",
  "CARREAU",
  "CHAISE",
  "CLASSE",
  "CLEF",
  "COIN",
  "COULOIR",
  "DOSSIER",
  "EAU",
  "ECOLE",
  "ENTRER",
  "ESCALIER",
  "ETAGERE",
  "EXTERIEUR",
  "FENETRE",
  "INTERIEUR",
  "LAVABO",
  "LIT",
  "MARCHE",
  "MATELAS",
  "MATERNELLE",
  "MEUBLE",
  "MOUSSE",
  "MUR",
  "PELUCHE",
  "PLACARD",
  "PLAFOND",
  "PORTE",
]

class App extends Component {

  initialState = {
    usedLetters: new Set(),
    phrase: mots[ Math.floor(Math.random() * Math.floor(mots.length)) ],
    score: 0,
  }

  state = { ...this.initialState }

  handleClick(lettre) {
    console.log(lettre, 'clicked')
  }

  render() {
    const { usedLetters, phrase } = this.state
    return (
      <div className="container">
        <div className="masque">
          <p>{computeDisplay(phrase, usedLetters)}</p>
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

// Produit une représentation textuelle de l’état de la partie,
// chaque lettre non découverte étant représentée par un _underscore_.
function computeDisplay(phrase, usedLetters) {
  return phrase.replace(/\w/g,
    (letter) => (usedLetters.has(letter) ? letter : '_')
  )
}

export default App;
