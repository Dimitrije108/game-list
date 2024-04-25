import html from "./index.html";
import './style.css';
import { gameFormData } from "./game-form-data";
import { Game } from "./add-game-logic";
import { modalController } from "./modal";
import { addLib } from "./add-library-logic";
import { libraries } from "./library-logic";

// testing
modalController();
addLib();

const libTab = document.querySelector('.lib-tab');

const switchLibrary = (e) => {
    const libraryList = [...libTab.children];
    const clickedLib = libraryList.indexOf(e);
    const activeLib = libraries.indexOf(clickedLib);
    console.log(activeLib);
    // figure out which lib was clicked
    // have a lib array connected to it once you know which one it is
    // delete current DOM
    // display the correct lib array DOM
}
// Make 2 options separately for these below?
libTab.addEventListener('click', (e) => {
    if (e.target.classList.contains('lib-container')) {
        switchLibrary(e.target);
    }
    if (e.target.classList.contains('lib-name')) {
        switchLibrary(e.target.parentElement);
    }
});

// Add library array logic:
// 1. when creating library create an array as well
// 2. connect that array to the library via dataset

const filterLibrary = () => {
    // figure out which library/project tab is selected
        // when a new project is created, we create a button in html, and an array
        // buttons data-attribute can be the name (they cant because name can be renamed, except maybe if initial name stays)
        // since they're dynamically created I cannot put eventListener on each one
        // so I should use event propagation on the container itself to see which
        // tab was clicked / do the tab-switching logic
        // theeen: let activeLibrary = e.target.dataAttribute
        // this way activeLibrary will be used until another library
        // is selected. Basically when eventListener pops of it will
        // switch the activeLibrary into the correct one and add
        // games to it.
    // then just push to the proper library
}

const gameController = () => {
    const game = new Game(gameFormData());
    library.push(game);
    modal.close();
};
// testing

