import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import {setupBlackjack} from './blackjack.js'

document.querySelector('#app').innerHTML = `
  <div>
    <div class='row my-2'>
      <div class='col text-center' id='buttons-container'>
        <button id='new-game-button' class='btn btn-danger' type="button">Nuevo Juego</button> 
        <button id='hit-button' class='btn btn-primary' type="button">Pedir Carta</button> 
        <button id='stand-button' class='btn btn-primary' type="button">Detener</button> 
      </div>
    </div>
    <div class="px-5">
      <h1 id='player-score'>Jugador - 0</h1>
      <div class='d-flex' id='player-cards'> 
      </div>
    </div>

    <div class='p-5'>
      <h1 id='game-over-msg'></h1>
    </div>

    <div class="px-5">
      <h1 id='dealer-score'>Dealer - 0</h1>
      <div id='dealer-cards' class="d-flex"> 
      </div>
    </div>

  </div>
`

setupBlackjack();



