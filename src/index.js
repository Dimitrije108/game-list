import html from "./index.html";
import './style.css';
import { gameFormData } from "./game-form-data";
import { Game, library } from "./add-game-logic";

// testing
const modalBtn = document.querySelector('.submitBtn');
modalBtn.addEventListener('click', (e) => {
    e.preventDefault;
    gameController();
})

const gameController = () => {
    const game = new Game(gameFormData());
    library.push(game);
    console.log(library);
}
// testing

