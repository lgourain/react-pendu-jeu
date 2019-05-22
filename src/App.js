import React, { Component } from 'react';
import './App.css';

const HIDDEN_CHARACTER = "_"
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
const   initialState = {
  usedLetters: new Set(),
  phrase: mots[ Math.floor(Math.random() * Math.floor(mots.length)) ],
  score: 0,
}

class App extends Component {

  state = initialState

  handleClick(lettre) {
    this.setState({
      usedLetters: this.state.usedLetters.add(lettre)
    })
  }

  reset = () => {
    this.setState({
      usedLetters: new Set(),
      phrase: mots[ Math.floor(Math.random() * Math.floor(mots.length)) ],
      score: 0,
    })
  }

  render() {
    const { usedLetters, phrase } = this.state
    const won = !computeDisplay(phrase, usedLetters).includes(HIDDEN_CHARACTER)
    return (
      <div className="container">
        <div className="masque">
          <p>{computeDisplay(phrase, usedLetters)}</p>
        </div>
        <div className="boutons">
          {
            alphabet.map((lettre, index) => {
              return (
                <button 
                  key={index} 
                  className={usedLetters.has(lettre) ? 'used' : 'not-used'}
                  onClick={() => this.handleClick(lettre)}
                >
                  {lettre}
                </button>
              )
            })
          }
        </div>
        { won && 
          <div className="gagne">
            <p>Félicitations ! 🎉</p>
            <p>Vous avez gagné la partie. Cliquez sur le bouton pour rejouer</p>
            <button onClick={this.reset}>Rejouer</button>
          </div>
        }
      </div>
    );
  }  
}

// Produit une représentation textuelle de l’état de la partie,
// chaque lettre non découverte étant représentée par un _underscore_.
function computeDisplay(phrase, usedLetters) {
  return phrase.replace(/\w/g,
    (letter) => (usedLetters.has(letter) ? letter : HIDDEN_CHARACTER)
  )
}

export default App;
