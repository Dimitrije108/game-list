import html from "./index.html";
import './style.css';
import { gameFormData } from "./game-form-data";
import { Game, library } from "./add-game-logic";
import { modalController } from "./modal";

// testing
modalController();

const addLib = () => {
    const addLibBtn = document.querySelector('.lib-add');
    const libTab = document.querySelector('.lib-tab');
    let activeInput = false;
    let renameInput = false;

    const createInput = () => {
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('id', 'newLib');
        newInput.setAttribute('name', 'newLib');
        newInput.setAttribute('placeholder', 'Name');
        newInput.setAttribute('minlength', '1');
        newInput.setAttribute('maxlength', '20');
        return newInput;
    };

    const createForm = () => {
        const newForm = document.createElement('form');
        newForm.classList.add('newForm');
        return newForm;
    };
    // Append elements;
    const appendEl = (parent, child) => {
        parent.appendChild(child);
        return parent;
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
        libTab.appendChild(newDivContainer);
    };
    // delete DOM element
    const delEl = (el) => {
        el.remove();
    };

    const renameInputField = (e) => {
        const container = e.target.parentElement;
        const currentName = container.querySelector('.lib-name');
        const inputCurrentName = createInput();
        inputCurrentName.value = currentName.textContent;
        const form = appendEl(createForm(), inputCurrentName)
        currentName.replaceWith(form);
        inputCurrentName.focus();
        return form;
    };

    const renameDivField = (value) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('lib-name');
        newDiv.textContent = value;
        return newDiv;
    };
    
    const renameLibController = (e) => {
        if (activeInput) return;
        if (!renameInput) {
            renameInputField(e);
            renameInput = true;
        } else {
            const form = document.querySelector('.newForm');
            form.replaceWith(renameDivField(e));
        }
    };

    const delLibController = (e) => {
        const container = e.target.parentElement;
        delEl(container);
    }
    // If input value > 0 = Create new library and remove the input;
    const inputController = () => {
        const selectForm = document.querySelector('.newForm');
        const selectInput = document.querySelector('#newLib');
        if (selectInput.value.length < 1) return;
        if (renameInput) {
            renameLibController(selectInput.value);
            renameInput = false;
        } else {
            createLibDiv(selectInput.value);
            delEl(selectForm);
            activeInput = false;
        }
    };
    // If no input field is present, create one, otherwise, focus it;
    const libController = () => {
        if (!activeInput && !renameInput) {
            const form = appendEl(createForm(), createInput());
            appendEl(libTab, form);
            activeInput = true;
        }
        const selectInput = document.querySelector('#newLib');
        selectInput.focus();
    };

    libTab.addEventListener('click', (e) => {
        if (e.target.classList.contains('lib-rename')) {
            renameLibController(e);
        }
        if (e.target.classList.contains('lib-del')) {
            delLibController(e);
        }
    });
    // Triggers when an input field is submitted;
    libTab.addEventListener('submit', (e) => {
        e.preventDefault();
        inputController();
    });

    addLibBtn.addEventListener('click', () => {
        libController();
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

