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
        let mustPlay = '';
        if (document.querySelector('#must-play').checked) {
            mustPlay = document.querySelector('#must-play').value;
        };
        const progress = document.querySelector('#progress').value;
        const dateCompleted = document.querySelector('#dateCompleted').value;
        const rating = document.querySelector('#rating').value;
        return { title, releaseDate, genre, mustPlay, progress, dateCompleted, rating, };
    };
    // Create and append game container with proper values
    addGame = (game) => {
        const contDiv = createDiv(undefined, 'game-container');
        const initView = createDiv(undefined, 'game-init');

        const nameCont = createDiv(undefined, 'game-stat-container');
        const nameValue = createDiv(game.title, 'game-name');
        nameCont.appendChild(nameValue);

        if (game.mustPlay !== '') {
            const mustPlay = createDiv(game.mustPlay, 'must-play');
            nameCont.appendChild(mustPlay);
        };

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

        const progressValue = createDiv(game.progress, 'value');
        
        initView.appendChild(nameCont);
        initView.appendChild(genreCont);
        initView.appendChild(addedCont);
        initView.appendChild(progressValue);
        contDiv.appendChild(initView);
        this.gamePage.appendChild(contDiv);
    };

    expandGame = (gameCont, game) => {
        const expandView = createDiv(undefined, 'game-expand');

        const releasedCont = createDiv(undefined, 'game-stat-container');
        const releasedLabel = createDiv('Released:', 'label');
        const releasedValue = createDiv(game.releaseDate, 'value');
        releasedCont.appendChild(releasedLabel);
        releasedCont.appendChild(releasedValue);
        expandView.appendChild(releasedCont);

        if (game.dateCompleted !== undefined) {
            const dateCompletedCont = createDiv(undefined, 'game-stat-container');
            const dateCompletedLabel = createDiv('Completed on:', 'label');
            const dateCompletedValue = createDiv(game.dateCompleted, 'value');
            dateCompletedCont.appendChild(dateCompletedLabel);
            dateCompletedCont.appendChild(dateCompletedValue);
            expandView.appendChild(dateCompletedCont);
        };

        if (game.rating !== '') {
            const ratingCont = createDiv(undefined, 'game-stat-container');
            const ratingLabel = createDiv('Your Rating:', 'label');
            const ratingValue = createDiv(game.rating, 'value');
            ratingCont.appendChild(ratingLabel);
            ratingCont.appendChild(ratingValue);
            expandView.appendChild(ratingCont);
        };

        const editBtn = createBtn('edit', 'game-edit');
        const delBtn = createBtn('del', 'game-del');
        expandView.appendChild(editBtn);
        expandView.appendChild(delBtn);

        gameCont.appendChild(expandView);
        // add eventListener and if it's registered the expand game closes/gets deleted
    };
    // Determines which game was clicked
    clickedGame = (e) => {
        const gameList = [...this.gamePage.children];
        const clickedGame = gameList.indexOf(e);
        return clickedGame;
    };
    // Iterates over library array and displays all game objects inside
    updateGameView = (activeLibrary) => {
        this.gamePage.textContent = '';
        activeLibrary.forEach((game) => this.addGame(game));
    };
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