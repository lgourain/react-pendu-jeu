import React, { Component } from 'react';
import './App.css';

const HIDDEN_CHARACTER = "_"
const NB_TENTATIVES = 11
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
  essais: 0,
}

class App extends Component {

  state = initialState
  canvas = this.refs.canvas

  componentDidUpdate() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    ctx.beginPath()
    console.log(this.state.score)
    switch(this.state.essais) {
      case 0:
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        break
      case 1:
        // ligne horizontale du bas
        ctx.moveTo(50, 400)
        ctx.lineTo(250, 400)
        break
      case 2:
        // ligne verticale à gauche
        ctx.moveTo(150, 400)
        ctx.lineTo(150, 100)
        break
      case 3:
        // ligne horizontale du haut
        ctx.moveTo(150, 100)
        ctx.lineTo(400, 100)
        break
      case 4:
        // ligne verticale à droite
        ctx.moveTo(400, 100)
        ctx.lineTo(400, 150)
        break
      case 5:
        // ligne biais
        ctx.moveTo(150, 150)
        ctx.lineTo(200, 100)
        break
      case 6:
        // tête bonhomme
        ctx.moveTo(425, 175)
        ctx.arc(400, 175, 25, 0, 2 * Math.PI)
        break
      case 7:
        // corps bonhomme
        ctx.moveTo(400, 200)
        ctx.lineTo(400, 300)
        break
      case 8:
        // bras droit bonhomme
        ctx.moveTo(400, 250)
        ctx.lineTo(450, 225)
        break
      case 9:
        // bras gauche bonhomme
        ctx.moveTo(400, 250)
        ctx.lineTo(350, 225)
        break
      case 10:
        // jambe droite bonhomme
        ctx.moveTo(400, 300)
        ctx.lineTo(455, 375)
        break
      case 11:
        // jambe gauche bonhomme
        ctx.moveTo(400, 300)
        ctx.lineTo(350, 375)
        break
      default:
        return
    }
    ctx.stroke();
  }

  handleClick(lettre) {
    const { usedLetters, phrase, essais } = this.state
    const newEssais = phrase.includes(lettre) ? 
      essais : 
      essais + 1
    this.setState({
      usedLetters: usedLetters.add(lettre),
      essais: newEssais,
    })
  }

  reset = () => {
    this.setState({
      usedLetters: new Set(),
      phrase: mots[ Math.floor(Math.random() * Math.floor(mots.length)) ],
      essais: 0,
    })
  }

  render() {
    const { usedLetters, phrase, essais } = this.state
    const won = !computeDisplay(phrase, usedLetters).includes(HIDDEN_CHARACTER)
    const lost = essais === NB_TENTATIVES
    return (
      <div className="container">
        <div className="essais">
          <p>Tentatives restantes : {NB_TENTATIVES - essais}</p>
        </div>
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
                  disabled={won || lost}
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
        { lost && 
          <div className="perdu">
            <p>💀</p>
            <p>Vous n'avez pas trouvé le mot ! 😪 Mais vous pouvez rééssayer en cliquant sur le bouton rejouer.</p>
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
