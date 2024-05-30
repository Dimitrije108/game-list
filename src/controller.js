export class Controller {
    constructor(LibraryModel, GameView, LibraryView) {
        this.Model = LibraryModel;
        this.GameView = GameView;
        this.LibraryView = LibraryView;
        this.collection = document.querySelector('.lib-main');
        // Switches to the Collection(main) library
        this.collection.addEventListener('click', (e) => this.switchToMainLib(e));
        this.addLibBtn = document.querySelector('.lib-add-btn');
        // Creates an input for a new library name
        this.addLibBtn.addEventListener('click', () => this.handleAddLibInput());
        this.libTab = document.querySelector('.lib-tab');
        // Triggers when an input field is submitted in the library sidebar
        this.libTab.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddLibrary(this.LibraryView.getInputValue());
        });
        this.libTab.addEventListener('click', (e) => this.handleLibTabEvents(e));
        this.gamePage = document.querySelector('.game-page');
        // Handles game container clicks - edit, delete or expand game
        this.gamePage.addEventListener('click', (e) => this.handleGamePageEvents(e));
        this.GameView.modal.addEventListener('click', (e) => this.handleModalEvents(e));
    };
    // HANDLERS
    // LIBRARY HANDLERS
    // Check form, rename library or create one
    handleAddLibrary(value) {
        const form = document.querySelector('.lib-form');
        if (form.checkValidity()) {
            if (this.LibraryView.renameInput) {
                this.Model.renameLibrary(this.LibraryView.addRenameDiv(value), value);
                this.Model.saveData();
                this.GameView.updateGameView(this.Model.activeLibrary.array, this.Model.activeLibrary.name);
                this.LibraryView.renameInput = false;
            } else {
                this.Model.addLibrary(value);
                this.Model.saveData();
                this.LibraryView.updateLibView(this.Model.getLibraries);
                this.LibraryView.activeInput = false;
            };
        };
        form.reportValidity();
    };
    // Add new library input or add the new library to the model depending on the state
    handleAddLibInput = () => {
        if (this.LibraryView.renameInput) return document.querySelector('#lib-input').focus();
        if (!this.LibraryView.activeInput) {
            this.LibraryView.addInput();
            this.LibraryView.activeInput = true;
            document.querySelector('#lib-input').focus();
        } else {
            document.querySelector('#lib-input').focus();
            this.handleAddLibrary(this.LibraryView.getInputValue());
        };
    };
    // Clicked library is the active library
    switchLibrary = (container) => {
        this.Model.activeLibrary = this.LibraryView.clickedLib(container);
        this.LibraryView.activeLib = container;
    };
    // Add rename input or save the one that was renamed:
    // This is done so you can change the name of the library both by pressing enter when
    // you fill out the input field or pressing the rename button again. Depending on the state
    // rename button will either create an input or submit the input.
    handleRenameLibrary = (e) => {
        if (this.LibraryView.activeInput) return document.querySelector('#lib-input').focus();
        if (!this.LibraryView.renameInput) {
            this.LibraryView.addRenameInput(e);
            this.LibraryView.renameInput = true;
            document.querySelector('#lib-input').focus();
        } else {
            this.handleAddLibrary(this.LibraryView.getInputValue());
        };
    };
    // Delete library and update view
    handleDelLib = (e) => {
        if (confirm("Are you sure you want to remove this library?")) {
            this.Model.delLibrary(this.LibraryView.clickedLib(e));
            this.Model.saveData();
            this.LibraryView.updateLibView(this.Model.getLibraries);
        };
    };
    // GAME HANDLERS
    // Check form, add new game to the library and update the view
    handleAddGame() {
        if (form.checkValidity()) {
            this.Model.addGame(this.GameView.getFormData());
            this.Model.saveData();
            this.GameView.updateGameView(this.Model.activeLibrary.array, this.Model.activeLibrary.name);
            this.GameView.modal.close();
            form.reset();
            this.GameView.expandState = false;
        };
    };
    // Expand game details container when clicked
    handleExpandGame = (gameCont) => {
        if (this.GameView.expandState) {
            // Close expand container if it's already open and clicked on again
            if (this.Model.activeLibrary.array.indexOf(this.Model.activeGame) === this.GameView.clickedGame(gameCont)) {
                document.querySelector('.game-expand').remove();
                this.GameView.expandState = false;
            } else {
            // Close the open one and expand the clicked one
                document.querySelector('.game-expand').remove();
                this.switchGame(gameCont);
                this.GameView.expandGame(gameCont, this.Model.activeGame);
            };
        // Otherwise expand the clicked container
        } else {
            this.switchGame(gameCont);
            this.GameView.expandGame(gameCont, this.Model.activeGame);
            this.GameView.expandState = true;
        };
    };
    // Check form, replace the game with the edited one
    handleEditGame = () => {
        if (form.checkValidity()) {
            this.Model.editGame(this.GameView.getFormData());
            this.Model.saveData();
            this.GameView.modal.close();
            this.GameView.updateGameView(this.Model.activeLibrary.array, this.Model.activeLibrary.name);
            form.reset();
            this.GameView.expandState = false;
            this.GameView.editModal = false;
        };
    };
    // Display edit game modal with game values filled in
    openEditModal = () => this.GameView.editGameModal(this.Model.activeGame);
    // Clicked game is the active game
    switchGame = (gameCont) => this.Model.activeGame = this.GameView.clickedGame(gameCont);
    // Delete game and update view
    handleDelGame = (gameCont) => {
        if (confirm("Are you sure you want to remove this game?")) {
            this.Model.delGame(this.GameView.clickedGame(gameCont));
            this.Model.saveData();
            this.GameView.updateGameView(this.Model.activeLibrary.array, this.Model.activeLibrary.name);
            this.GameView.expandState = false;
        };
    };
    // EVENT HANDLERS
    // Switches to the Collection(main) library
    // Disable previous active library style, switch the library, update the view, update active library style, 
    // update expand state if active
    switchToMainLib = (e) => {
        this.LibraryView.toggleActiveLibStyle();
        this.switchLibrary(e.target);
        this.GameView.updateGameView(this.Model.activeLibrary.array, this.Model.activeLibrary.name);
        this.LibraryView.toggleActiveLibStyle();
        this.GameView.expandState = false;
    };
    // Handle library sidebar event delegation logic
    handleLibTabEvents = (e) => {
        const renameButton = e.target.closest('.lib-rename');
        const delButton = e.target.closest('.lib-del');
        const container = e.target.closest('.lib-container');
        const cancelInput = e.target.closest('.cancel-svg');
        // Rename library activates from a button click or a click on svg image elements inside the button
        if (renameButton) {
            this.handleRenameLibrary(renameButton.closest('.lib-container'));
        } else if (delButton) {
        // Delete library activates from a button click or a click on svg image elements inside the button
            this.handleDelLib(delButton.parentElement);
        } else if (container) {
        // Switch the active library to the one that was clicked
            this.LibraryView.toggleActiveLibStyle();
            this.switchLibrary(container);
            this.GameView.updateGameView(this.Model.activeLibrary.array, this.Model.activeLibrary.name);
            this.LibraryView.toggleActiveLibStyle();
            this.GameView.expandState = false;
        };
        if (cancelInput) {
            cancelInput.closest('.input-container').remove();
            this.LibraryView.activeInput = false;
        };
    };
    // Handle game page event delegation logic
    handleGamePageEvents = (e) => {
        const editButton = e.target.closest('.game-edit');
        const delButton = e.target.closest('.game-del');
        const container = e.target.closest('.game-container');

        if (editButton) {
            this.openEditModal();
        } else if (delButton) {
            this.handleDelGame(container);
        } else if (container) {
            this.handleExpandGame(container);
        };
    };
    handleModalEvents = (e) => {
        // Edit or add game
        if (e.target.classList.contains('game-save')) {
            e.preventDefault();
            this.handleEditGame(e);
            form.reportValidity();
        } else if (e.target.classList.contains('modal-btn-submit')) {
            e.preventDefault();
            this.handleAddGame(e);
            form.reportValidity();
        };
        // Close modal if a click is registered outside of the modal box
        const dialogDimensions = this.GameView.modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            this.GameView.modal.close();
            // Reset the form so edit values don't stay filled if add new game is used after it
            if (this.GameView.editModal === true) {
                form.reset();
                this.GameView.editModal = false;
            };
        };
    };
    // If stored data exists load it and update the view, if not, create the storage reference
    initData = () => {
        if (localStorage.getItem("collection") && localStorage.getItem("libraries")) {
            this.Model.loadData();
            this.LibraryView.updateLibView(this.Model.getLibraries);
            this.GameView.updateGameView(this.Model.activeLibrary.array, this.Model.activeLibrary.name);
        } else {
            this.Model.saveData();
            this.GameView.updateGameView(this.Model.activeLibrary.array, this.Model.activeLibrary.name);
        };
    };
};
