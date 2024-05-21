export class Controller {
    constructor(LibraryModel, GameView, LibraryView) {
        this.Model = LibraryModel;
        this.GameView = GameView;
        this.LibraryView = LibraryView;
        this.collection = document.querySelector('.lib-main');
        // Switches to the Collection(main) library
        this.collection.addEventListener('click', () => {
            this.switchLibrary();
            this.GameView.updateGameView(this.Model.activeLibrary);
            this.GameView.expandState = false;
        });
        this.addLibBtn = document.querySelector('.lib-add-btn');
        // Creates an input for a new library name
        this.addLibBtn.addEventListener('click', () => this.handleAddLibInput());
        this.libTab = document.querySelector('.lib-tab');
        // Triggers when an input field is submitted in the library sidebar
        this.libTab.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddLibrary(this.LibraryView.getInputValue());
        });
        this.libTab.addEventListener('click', (e) => {
            // Rename library activates from a button click or a click on svg image elements inside the button
            const renameButton = e.target.closest('.lib-rename');
            if (renameButton) {
                this.handleRenameLibrary(renameButton.closest('.lib-container'));
            };
            // Delete library activates from a button click or a click on svg image elements inside the button
            const delButton = e.target.closest('.lib-del');
            if (delButton) {
                this.handleDelLib(delButton.parentElement);
            };
            // Switch the active library to the one clicked
            if (e.target.classList.contains('lib-container')) {
                this.switchLibrary(e.target);
                this.GameView.updateGameView(this.Model.activeLibrary);
                this.GameView.expandState = false;
            };
            if (e.target.classList.contains('lib-name')) {
                this.switchLibrary(e.target.parentElement);
                this.GameView.updateGameView(this.Model.activeLibrary);
                this.GameView.expandState = false;
            };
        });
        this.gamePage = document.querySelector('.game-page');
        // Handles game container clicks - edit game or expand game
        // add del
        this.gamePage.addEventListener('click', (e) => {
            if (e.target.classList.contains('game-edit')) {
                this.openEditModal();
            } else if (e.target.classList.contains('game-del')) {
                this.handleDelGame(e.target.closest('.game-container'));
            } else if (e.target.closest('.game-container')) {
                this.handleExpandGame(e);
            };
        });
        this.GameView.modal.addEventListener('click', (e) => {
            // Close modal if a click is registered outside of the modal box
            const dialogDimensions = this.GameView.modal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                this.GameView.modal.close();
            };
            // Triggers when Game form is submitted
            // Edit or add the game
            if (e.target.classList.contains('game-save')) {
                this.handleEditGame(e);
            } else if (e.target.classList.contains('modal-btn-submit')) {
                this.handleAddGame(e);
            };
        });
    };
    // HANDLERS
    // Checks form, adds new game to the library and updates the view
    handleAddGame(e) {
        if (form.checkValidity()) {
            e.preventDefault();
            this.Model.addGame(this.GameView.getFormData());
            this.Model.saveData();
            this.GameView.modal.close();
            this.GameView.updateGameView(this.Model.activeLibrary);
            form.reset();
            this.GameView.expandState = false;
        };
    };
    // Submitted input field -> rename library or create one
    handleAddLibrary(value) {
        const form = document.querySelector('.newForm');
        if (form.checkValidity()) {
            if (this.LibraryView.renameInput) {
                this.Model.renameLibrary(this.LibraryView.addRenameDiv(value), value);
                this.Model.saveData();
                this.LibraryView.renameInput = false;
            } else {
                this.Model.addLibrary(value);
                this.Model.saveData();
                this.LibraryView.updateLibView(this.Model.getLibraries);
                this.LibraryView.activeInput = false;
            };
        };
    };
    // Add new library input or add the new library to the system depending on the state
    handleAddLibInput = () => {
        if (this.LibraryView.renameInput) return document.querySelector('#newLib').focus();
        if (!this.LibraryView.activeInput) {
            this.LibraryView.addInput();
            this.LibraryView.activeInput = true;
            document.querySelector('#newLib').focus();
        } else {
            this.handleAddLibrary(this.LibraryView.getInputValue());
        }
    };
    // Add rename input or save the one that was renamed:
    // This is done so you can change the name of the library both by pressing enter when
    // you fill out the input field or pressing the rename button again. Depending on the state
    // rename button will either create an input or submit the input.
    handleRenameLibrary = (e) => {
        if (this.LibraryView.activeInput) return document.querySelector('#newLib').focus();
        if (!this.LibraryView.renameInput) {
            this.LibraryView.addRenameInput(e);
            this.LibraryView.renameInput = true;
            document.querySelector('#newLib').focus();
        } else {
            this.handleAddLibrary(this.LibraryView.getInputValue());
        };
    };
    // Expand game details container when clicked
    handleExpandGame = (e) => {
        const gameCont = e.target.closest('.game-container');
        if (this.GameView.expandState) {
            // Close expand container if it's already open and clicked on again
            if (this.Model.activeLibrary.indexOf(this.Model.activeGame) === this.GameView.clickedGame(gameCont)) {
                document.querySelector('.game-expand').remove();
                this.GameView.expandState = false;
            // Close the open one and expand the clicked one
            } else {
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
    // Checks form and replaces edited game with the one that has the edited
    // info and updates game view
    handleEditGame = (e) => {
        if (form.checkValidity()) {
            e.preventDefault();
            this.Model.editGame(this.GameView.getFormData());
            this.Model.saveData();
            this.GameView.modal.close();
            this.GameView.updateGameView(this.Model.activeLibrary);
            form.reset();
            this.GameView.expandState = false;
        };
    };
    // Displays modal to edit with game values filled in
    openEditModal = () => this.GameView.editGameModal(this.Model.activeGame);
    // Clicked library becomes the active library
    switchLibrary = (e) => this.Model.activeLibrary = this.LibraryView.clickedLib(e);
    // Clicked game becomes the active game
    switchGame = (e) => this.Model.activeGame = this.GameView.clickedGame(e);
    // Delete library and update view
    handleDelLib = (e) => {
        if (confirm("Are you sure you want to remove this library?")) {
            this.Model.delLibrary(this.LibraryView.clickedLib(e));
            this.Model.saveData();
            this.LibraryView.updateLibView(this.Model.getLibraries);
        };
    };
    // Delete game and update view
    handleDelGame = (e) => {
        if (confirm("Are you sure you want to remove this game?")) {
            this.Model.delGame(this.GameView.clickedGame(e));
            this.Model.saveData();
            this.GameView.updateGameView(this.Model.activeLibrary);
            this.GameView.expandState = false;
        };
    };
    // If stored data exists load it and update the view, if not, create the storage reference
    initData = () => {
        if (localStorage.getItem("collection") || localStorage.getItem("libraries")) {
            this.Model.loadData();
            this.LibraryView.updateLibView(this.Model.getLibraries);
            this.GameView.updateGameView(this.Model.activeLibrary);
        } else {
            this.Model.saveData();
        };
    };
};
