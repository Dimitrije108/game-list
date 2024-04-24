import html from "./index.html";
import './style.css';
import { gameFormData } from "./game-form-data";
import { Game, library } from "./add-game-logic";
import { modalController } from "./modal";
import { addLib } from "./add-library-logic";

// testing
modalController();
addLib();

// tab switching logic (not really because the background
// stays the same I just load up different content):
// 1. Make library container clickable
// Once it's clicked:
// 1. Delete displayed DOM
// 2. Switch active library so it's the correct one
// 3. Display that libraries content in DOM

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

