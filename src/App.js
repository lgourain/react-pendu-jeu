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

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    ctx.beginPath();
    // ligne verticale à gauche
    ctx.moveTo(150, 400);
    ctx.lineTo(150, 100);
    // ligne verticale à droite
    ctx.moveTo(400, 100);
    ctx.lineTo(400, 150);
    // ligne horizontale du bas
    ctx.moveTo(50, 400);
    ctx.lineTo(250, 400);
    // ligne horizontale du haut
    ctx.moveTo(150, 100);
    ctx.lineTo(400, 100);
    // ligne biais
    ctx.moveTo(150, 150);
    ctx.lineTo(200, 100);
    // tête bonhomme
    ctx.moveTo(425, 175);
    ctx.arc(400, 175, 25, 0, 2 * Math.PI);
    // corps bonhomme
    ctx.moveTo(400, 200);
    ctx.lineTo(400, 300);
    // bras droit bonhomme
    ctx.moveTo(400, 250);
    ctx.lineTo(450, 225);
    // bras gauche bonhomme
    ctx.moveTo(400, 250);
    ctx.lineTo(350, 225);
    // jambe droite bonhomme
    ctx.moveTo(400, 300);
    ctx.lineTo(455, 375);
    // jambe gauche bonhomme
    ctx.moveTo(400, 300);
    ctx.lineTo(350, 375);
    ctx.stroke();
  }

  handleClick(lettre) {
    const { usedLetters, phrase, score } = this.state
    const newScore = usedLetters.has(lettre) ? 
      score - 2 : 
      (phrase.includes(lettre)) ? 
        score + 1 : 
        score - 1
    
    this.setState({
      usedLetters: this.state.usedLetters.add(lettre),
      score: newScore,
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
    const { usedLetters, phrase, score } = this.state
    const won = !computeDisplay(phrase, usedLetters).includes(HIDDEN_CHARACTER)
    return (
      <div className="container">
        <p className="score">Score : {score}</p>
        <div className="pendu">
          <canvas ref="canvas" id="canvas" width={500} height={500}>
          </canvas>
        </div>
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
