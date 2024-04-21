import html from "./index.html";
import './style.css';
import { gameFormData } from "./game-form-data";
import { Game, library } from "./add-game-logic";
import { modalController } from "./modal";

// testing
modalController();

const addLib = () => {
    const addLibrary = document.querySelector('.lib-add');
    const libraryTab = document.querySelector('.lib-tab');
    let activeInput = false;

    const createInput = () => {
        const newForm = document.createElement('form');
        const newInput = document.createElement('input');

        newForm.classList.add('newForm');

        newInput.setAttribute('type', 'text');
        newInput.setAttribute('id', 'newLib');
        newInput.setAttribute('name', 'newLib');
        newInput.setAttribute('placeholder', 'Name');

        newForm.appendChild(newInput);
        libraryTab.appendChild(newForm);
    };

    const createLibDiv = (name) => {
        const newDivContainer = document.createElement('div');
        const newDiv = document.createElement('div');
        const newRenameBtn = document.createElement('button');
        const newDelBtn = document.createElement('button');

        newDivContainer.classList.add('lib-container');
        newDiv.classList.add('lib-name');
        newRenameBtn.classList.add('lib-rename');
        newDelBtn.classList.add('lib-del');

        newDiv.textContent = name;
        newRenameBtn.textContent = 'rename';
        newDelBtn.textContent = 'del';

        newDivContainer.appendChild(newDiv);
        newDivContainer.appendChild(newRenameBtn);
        newDivContainer.appendChild(newDelBtn);
        libraryTab.appendChild(newDivContainer);
    };
    // delete DOM element
    const delEl = (el) => {
        el.remove();
    }

    // const renameLib = (e) => {
    //     const container = e.target.parentElement;
    //     const renameEl = container.querySelector('.lib-name');
    //     // transform it into an input field
    //     // that has the current name inside it
    //     // submit the value and therefore change the name
    // }
    // If input > 0 = Create new library and remove the input;
    const inputController = () => {
        const selectForm = document.querySelector('.newForm');
        const selectInput = document.querySelector('#newLib');
        if (selectInput.value.length < 1) return;
        createLibDiv(selectInput.value);
        delEl(selectForm);
        activeInput = false;
    };
    // If no input field is present, create one, otherwise, focus it;
    const libraryController = () => {
        if (!activeInput) {
            createInput();
            activeInput = true;
        }
        const selectInput = document.querySelector('#newLib');
        selectInput.focus();
    };

    libraryTab.addEventListener('click', (e) => {
        if (e.target.classList.contains('lib-rename')) {
            renameLib(e);
        }
    });
    // Triggers when an input field is submitted;
    libraryTab.addEventListener('submit', (e) => {
        e.preventDefault();
        inputController();
    });

    addLibrary.addEventListener('click', () => {
        libraryController();
    });
}

addLib();

const filterLibrary = () => {
    // figure out which library/project tab is selected
        // when a new project is created, we create a button in html, and an array
        // buttons data-attribute can be the name
        // since they're dynamically created I cannot put eventListener on each one
        // so I should use event propagation on the container itself to see which
        // button was clicked / do the tab-switching logic
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

