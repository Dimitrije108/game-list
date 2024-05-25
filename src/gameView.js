import { createDiv, createBtn, createEditIcon, createTrashIcon } from "./utils";
const { format, parse } = require("date-fns");

export class GameView {
    constructor() {
        this.addGameBtn = document.querySelector('.add-game');
        this.modal = document.querySelector('.modal');
        this.gamePage = document.querySelector('.game-page');
        // If the game cont is expanded with additional info or not
        this.expandState = false;
        this.editModal = false;
        this.addGameBtn.addEventListener('click', () => {
            this.modal.showModal();
            // Changes it back to the submit btn if edit btn was previously used
            // This is done so as to reuse the same modal form and only change
            // the btn that submits the form
            if (document.querySelector('.game-save')) {
                const changeBtn = document.querySelector('.game-save');
                changeBtn.textContent = 'Submit';
                changeBtn.classList.replace('game-save', 'modal-btn-submit');
            };
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

        const nameCont = createDiv(undefined, 'game-name-container');
        nameCont.classList.add('center-name');
        const nameValue = createDiv(game.title, 'game-name');
        nameCont.appendChild(nameValue);
        // Display must play if it's checked
        if (game.mustPlay !== '') {
            const mustPlay = createDiv(game.mustPlay, 'must-play');
            nameCont.classList.remove('center-name');
            nameCont.appendChild(mustPlay);
        };

        const releasedCont = createDiv(undefined, 'game-stat-container');
        const numberPlacement = createDiv(undefined, 'game-number-container');
        const releasedValue = createDiv(game.releaseDate, 'released-value');
        numberPlacement.appendChild(releasedValue);
        releasedCont.appendChild(numberPlacement);

        const genreCont = createDiv(undefined, 'game-stat-container');
        const genreValue = createDiv(game.genre, 'value');
        genreCont.appendChild(genreValue);

        const progressCont = createDiv(undefined, 'game-stat-container');
        const progressValue = createDiv(game.progress, 'value');
        progressCont.appendChild(progressValue);
        
        initView.appendChild(nameCont);
        initView.appendChild(releasedCont);
        initView.appendChild(genreCont);
        initView.appendChild(progressCont);
        contDiv.appendChild(initView);
        this.gamePage.appendChild(contDiv);
    };
    // Expand game container(when clicked) with additional information
    expandGame = (gameCont, game) => {
        const expandView = createDiv(undefined, 'game-expand');

        const addedCont = createDiv(undefined, 'game-expand-container');
        const addedLabel = createDiv('Added:', 'label');
        const addedValue = createDiv(game.added, 'value');
        addedCont.appendChild(addedLabel);
        addedCont.appendChild(addedValue);
        expandView.appendChild(addedCont);
        // Display date completed only if it's filled out
        if (game.dateCompleted !== '') {
            const dateCompletedCont = createDiv(undefined, 'game-expand-container');
            const dateCompletedLabel = createDiv('Completed:', 'label');
            const dateCompletedValue = createDiv(game.dateCompleted, 'value');
            dateCompletedCont.appendChild(dateCompletedLabel);
            dateCompletedCont.appendChild(dateCompletedValue);
            expandView.appendChild(dateCompletedCont);
        };
        // Display rating only if it's filled out
        if (game.rating !== '') {
            const ratingCont = createDiv(undefined, 'game-expand-container');
            const ratingLabel = createDiv('Your Rating:', 'label');
            const ratingValue = createDiv(`${game.rating}/10`, 'value');
            ratingCont.appendChild(ratingLabel);
            ratingCont.appendChild(ratingValue);
            expandView.appendChild(ratingCont);
        };

        const editBtn = createBtn(undefined, 'game-edit');
        editBtn.title = 'Edit';
        createEditIcon(editBtn, 20);

        const delBtn = createBtn(undefined, 'game-del');
        delBtn.title = 'Delete';
        createTrashIcon(delBtn, 20);

        const svg = delBtn.querySelector('.trash-icon');
        // Change trash icon color to red when hovering over button
        delBtn.addEventListener('mouseover', () => svg.style.fill = 'red');
        // Change it back to standard
        delBtn.addEventListener('mouseout', () => svg.style.fill = '#111918');

        expandView.appendChild(editBtn);
        expandView.appendChild(delBtn);
        gameCont.appendChild(expandView);
    };
    // Displays modal and fills in input fields with game values so they're editable
    editGameModal = (game) => {
        this.modal.showModal();
        document.querySelector('#title').value = game.title;
        document.querySelector('#release-date').value = game.releaseDate;
        document.querySelector('#genre').value = game.genre;
        if (game.mustPlay !== '') {
            document.querySelector('#must-play').checked = true;
        };
        document.querySelector('#progress').value = game.progress;
        // Date has to be reformatted into the original so it can be used as set value
        if (game.dateCompleted !== '') {
            const parsedDate = parse(game.dateCompleted, 'dd/MM/yyyy', new Date());
            const reformatted = format(parsedDate, 'yyyy-MM-dd');
            document.querySelector('#dateCompleted').value = reformatted;
        };
        document.querySelector('#rating').value = game.rating;
        // Replace the submit button with save button
        if (document.querySelector('.modal-btn-submit')) {
            const changeBtn = document.querySelector('.modal-btn-submit');
            changeBtn.textContent = 'Save';
            changeBtn.classList.replace('modal-btn-submit', 'game-save');
        };
        this.editModal = true;
    };
    // Determines which game was clicked
    clickedGame = (e) => {
        const gameList = [...this.gamePage.children];
        const clickedGame = gameList.indexOf(e);
        return clickedGame;
    };
    // Iterates over library array and displays all game objects inside
    updateGameView = (activeLibrary, libName) => {
        this.gamePage.textContent = '';
        activeLibrary.forEach((game) => this.addGame(game));
        document.querySelector('.lib-info-name').textContent = libName;
        document.querySelector('.lib-info-number').textContent = `(${activeLibrary.length} games)`;
    };
};
