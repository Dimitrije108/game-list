import { createForm, createInput, createDiv, createBtn } from "./utils";

export class GameView {
    constructor() {
        this.addGameBtn = document.querySelector('.add-game');
        this.modal = document.querySelector('.modal');
        this.gamePage = document.querySelector('.game-page');
        this.addGameBtn.addEventListener('click', () => this.modal.showModal());
        // Close modal if a click is registered outside of the modal box
        this.modal.addEventListener('click', (e) => {
            const dialogDimensions = this.modal.getBoundingClientRect()
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                this.modal.close();
            }
        });
    };
    // Extract submitted game modal form data
    getFormData = () => {
        const title = document.querySelector('#title').value;
        const releaseDate = document.querySelector('#release-date').value;
        const genre = document.querySelector('#genre').value;
        const completed = document.querySelector('#completed').value;
        const mustPlay = document.querySelector('#must-play').value;
        return { title, releaseDate, genre, completed, mustPlay, };
    };
    // Create and append game container with proper values
    addGame = (game) => {
        const contDiv = createDiv(undefined, 'game-container');
        const nameDiv = createDiv(game.title, 'game-name');

        const releasedCont = createDiv(undefined, 'game-stat-container');
        const releasedLabel = createDiv('Released:', 'label');
        const releasedValue = createDiv(game.releaseDate, 'value');
        releasedCont.appendChild(releasedLabel);
        releasedCont.appendChild(releasedValue);

        const genreCont = createDiv(undefined, 'game-stat-container');
        const genreLabel = createDiv('Genre:', 'label');
        const genreValue = createDiv(game.genre, 'value');
        genreCont.appendChild(genreLabel);
        genreCont.appendChild(genreValue);

        const addedCont = createDiv(undefined, 'game-stat-container');
        const addedLabel = createDiv('Added:', 'label');
        const addedValue = createDiv(game.added, 'value');
        addedCont.appendChild(addedLabel);
        addedCont.appendChild(addedValue);

        const completedCont = createDiv(undefined, 'game-stat-container');
        const completedLabel = createDiv('Completed:', 'label');
        const completedValue = createDiv(game.completed, 'value');
        completedCont.appendChild(completedLabel);
        completedCont.appendChild(completedValue);

        const mustPlayCont = createDiv(undefined, 'game-stat-container');
        const mustPlayLabel = createDiv('Must play:', 'label');
        const mustPlayValue = createDiv(game.mustPlay, 'value');
        mustPlayCont.appendChild(mustPlayLabel);
        mustPlayCont.appendChild(mustPlayValue);
        
        contDiv.appendChild(nameDiv);
        contDiv.appendChild(releasedCont);
        contDiv.appendChild(genreCont);
        contDiv.appendChild(addedCont);
        contDiv.appendChild(completedCont);
        contDiv.appendChild(mustPlayCont);
        this.gamePage.appendChild(contDiv);
    }
    // Iterates over library array and displays all game objects inside
    updateGameView = (activeLibrary) => {
        this.gamePage.textContent = '';
        activeLibrary.forEach((game) => this.addGame(game));
    }
};

export class LibraryView {
    constructor() {
        this.activeInput = false;
        this.renameInput = false;
        this.libTab = document.querySelector('.lib-tab');
        this.libTab.addEventListener('click', (e) => {
            e.target.classList.contains('lib-rename') && this.handleRename(e);
        });
        this.addLibBtn = document.querySelector('.lib-add');
        this.addLibBtn.addEventListener('click', () => this.handleAddInput());
    }
    
    addInput = () => {
        const form = createForm();
        form.appendChild(createInput());
        this.libTab.appendChild(form);
    };

    getInputValue = () => document.querySelector('#newLib').value;
    // If no input field is present, create one, otherwise, focus it;
    handleAddInput = () => {
        if (!this.activeInput && !this.renameInput) {
            this.addInput();
            this.activeInput = true;
        }
        document.querySelector('#newLib').focus();
    };
    // Create and append library container
    addLibContainer = (name) => {
        const containerDiv = createDiv(undefined, 'lib-container');
        const nameDiv = createDiv(name, 'lib-name');
        const renameBtn = createBtn('rename', 'lib-rename');
        const delBtn = createBtn('del', 'lib-del');
        containerDiv.appendChild(nameDiv);
        containerDiv.appendChild(renameBtn);
        containerDiv.appendChild(delBtn);
        this.libTab.appendChild(containerDiv);
    };
    // Replace current library name div with an input field form
    addRenameInput = (e) => {
        const container = e.target.parentElement;
        const currentName = container.querySelector('.lib-name');
        const inputCurrentName = createInput();
        inputCurrentName.value = currentName.textContent;
        const form = createForm();
        form.appendChild(inputCurrentName);
        currentName.replaceWith(form);
    };
    // Create an input to rename a div or focus the one that is already active
    handleRename = (e) => {
        if (this.activeInput) return;
        if (!this.renameInput) {
            this.addRenameInput(e);
            this.renameInput = true;
        };
        document.querySelector('#newLib').focus();
    };
    // Replace the input field with the renamed div
    addRenameDiv = (value) => {
        const form = document.querySelector('.newForm');
        const renamedDiv = createDiv(value, 'lib-name');
        form.replaceWith(renamedDiv);
        return this.clickedLib(renamedDiv.parentElement);
    };
    // Determines which library was clicked
    clickedLib = (e) => {
        const libraryList = [...this.libTab.children];
        const clickedLib = libraryList.indexOf(e);
        return clickedLib;
    };
    // Iterates over libraries array and displays all libraries inside
    updateLibView = (libraries) => {
        this.libTab.textContent = '';
        libraries.forEach((lib) => this.addLibContainer(lib.name));
    };
};