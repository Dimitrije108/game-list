import html from "./index.html";
import './style.css';
import gameFormData from "./game-form-data";
import Game from "./add-game-logic";
import { modalController } from "./modal";
import { delEl, libTab, clickedLib } from "./utils";
import { addLibArr, delLibArr } from "./library-logic";
import { inputController, createLibInput, renameController, switchLibrary } from "./dom-library-logic";

// testing
modalController();

const addLibBtn = document.querySelector('.lib-add');

// If new library is created, create the library array as well
const addLibController = () => {
    if (inputController()) {
        addLibArr();
    };
};

const delLib = (e) => {
    if (confirm("Are you sure you want to remove this library?")) {
        delLibArr(clickedLib(e));
        delEl(e);
    };
};

addLibBtn.addEventListener('click', () => {
    createLibInput();
});
// Triggers when an input field is submitted;
libTab.addEventListener('submit', (e) => {
    e.preventDefault();
    addLibController();
});

libTab.addEventListener('click', (e) => {
    // rename and delete buttons
    if (e.target.classList.contains('lib-rename')) {
        renameController(e);
    };
    if (e.target.classList.contains('lib-del')) {
        delLib(e.target.parentElement);
    };
    // Switch the active library to the one clicked
    if (e.target.classList.contains('lib-container')) {
        switchLibrary(e.target);
    };
    if (e.target.classList.contains('lib-name')) {
        switchLibrary(e.target.parentElement);
    };
});

const gameController = () => {
    const game = new Game(gameFormData());
    activeLib.push(game);
    modal.close();
};
// testing

