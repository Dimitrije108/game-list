import { createForm, createInput, createDiv, createBtn, appendEl, delEl } from "./utils";

export class GameView {
    constructor() {
        this.addGameBtn = document.querySelector('.add-game');
        this.modal = document.querySelector('.modal');
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
        this.gamePage = document.querySelector('.game-page');
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
        const containerDiv = createDiv(undefined, 'game-container');
        const nameDiv = createDiv(game.title, 'game-name');
        appendEl(containerDiv, nameDiv);

        const releasedContainer = createDiv(undefined, 'game-stat-container');
        const releasedLabel = createDiv('Released:');
        const releasedValue = createDiv(game.releaseDate);
        appendEl(releasedContainer, releasedLabel);
        appendEl(releasedContainer, releasedValue);
        appendEl(containerDiv, releasedContainer);

        const genreContainer = createDiv(undefined, 'game-stat-container');
        const genreLabel = createDiv('Genre:');
        const genreValue = createDiv(game.genre);
        appendEl(genreContainer, genreLabel);
        appendEl(genreContainer, genreValue);
        appendEl(containerDiv, genreContainer);

        const addedContainer = createDiv(undefined, 'game-stat-container');
        const addedLabel = createDiv('Added:');
        const addedValue = createDiv(game.added);
        appendEl(addedContainer, addedLabel);
        appendEl(addedContainer, addedValue);
        appendEl(containerDiv, addedContainer);

        const completedContainer = createDiv(undefined, 'game-stat-container');
        const completedLabel = createDiv('Completed:');
        const completedValue = createDiv(game.completed);
        appendEl(completedContainer, completedLabel);
        appendEl(completedContainer, completedValue);
        appendEl(containerDiv, completedContainer);

        const mustPlayContainer = createDiv(undefined, 'game-stat-container');
        const mustPlayLabel = createDiv('Must play:');
        const mustPlayValue = createDiv(game.mustPlay);
        appendEl(mustPlayContainer, mustPlayLabel);
        appendEl(mustPlayContainer, mustPlayValue);
        appendEl(containerDiv, mustPlayContainer);
        
        appendEl(this.gamePage, containerDiv);
    }
    // Iterates over library array and displays all game objects inside
    updateGameView = (activeLibrary) => {
        this.gamePage = '';
        activeLibrary.forEach(this.addGame(game));
    }
};

export class LibraryView {
    constructor() {
        this.activeInput = false;
        this.renameInput = false;
        this.form = appendEl(createForm(), createInput());
        this.libTab = document.querySelector('.lib-tab');
        this.libTab.addEventListener('click', (e) => {
            if (e.target.classList.contains('lib-rename')) {
                this.handleRename(e);
            };
        });
        this.addLibBtn = document.querySelector('.lib-add');
        this.addLibBtn.addEventListener('click', () => this.handleAddInput());
    }
    
    addInput = () => appendEl(this.libTab, this.form);

    focusInput = () => document.querySelector('#newLib').focus();

    getInputValue = () => document.querySelector('#newLib').value;
    // If no input field is present, create one, otherwise, focus it;
    handleAddInput = () => {
        if (!this.activeInput && !this.renameInput) {
            this.addInput();
            this.activeInput = true;
        }
        this.focusInput();
    };
    // Create library container
    createLibContainer = (name) => {
        const containerDiv = createDiv(undefined, 'lib-container');
        const nameDiv = createDiv(name, 'lib-name');
        const renameBtn = createBtn('rename', 'lib-rename');
        const delBtn = createBtn('del', 'lib-del');

        appendEl(containerDiv, nameDiv);
        appendEl(containerDiv, renameBtn);
        appendEl(containerDiv, delBtn);
        return containerDiv;
    };

    addLibrary = (value) => {
        delEl(document.querySelector('.newForm'));
        appendEl(this.libTab, createLibContainer(value));
    }
    // Replace current library name div with an input field form
    addRenameInput = (e) => {
        const container = e.target.parentElement;
        const currentName = container.querySelector('.lib-name');
        const inputCurrentName = createInput();
        inputCurrentName.value = currentName.textContent;
        const form = appendEl(createForm(), inputCurrentName);
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
    };
    // Determines which library was clicked
    clickedLib = (e) => {
        const libTab = document.querySelector('.lib-tab');
        const libraryList = [...libTab.children];
        const clickedLib = libraryList.indexOf(e);
        return clickedLib;
    };
}