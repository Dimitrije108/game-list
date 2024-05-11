export class Controller {
    constructor(LibraryModel, GameView, LibraryView) {
        this.Model = LibraryModel;
        this.GameView = GameView;
        this.LibraryView = LibraryView;
        this.collection = document.querySelector('.lib-main');
        // Switches to the Collection(main) library
        this.collection.addEventListener('click', () => this.switchLibrary());
        this.libTab = document.querySelector('.lib-tab');
        // Triggers when an input field is submitted in the library sidebar
        this.libTab.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddLibrary(this.LibraryView.getInputValue());
        });
        this.libTab.addEventListener('click', (e) => {
            // Delete and rename library buttons
            e.target.classList.contains('lib-del') && this.delLib(e.target.parentElement);
            e.target.classList.contains('lib-rename') && this.LibraryView.handleRename(e);
            // Switch the active library to the one clicked
            e.target.classList.contains('lib-container') && this.switchLibrary(e.target);
            e.target.classList.contains('lib-name') && this.switchLibrary(e.target.parentElement);
        });
        this.gamePage = document.querySelector('.game-page');
        // Handles game cont clicks - edit game or expand game
        // add del
        this.gamePage.addEventListener('click', (e) => {
            if (e.target.classList.contains('game-edit')) {
                this.openEditModal();
            } else if (e.target.classList.contains('game-del')) {
                this.delGame(e.target.closest('.game-container'));
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
            this.GameView.modal.close();
            this.GameView.updateGameView(this.Model.activeLibrary);
            form.reset();
        };
    };
    // Submitted input field - rename library or create one
    handleAddLibrary(value) {
        if (value.length < 1) return;
        if (this.LibraryView.renameInput) {
            this.Model.renameLibrary(this.LibraryView.addRenameDiv(value), value);
            this.LibraryView.renameInput = false;
        } else {
            this.Model.addLibrary(value);
            this.LibraryView.updateLibView(this.Model.getLibraries);
            this.LibraryView.activeInput = false;
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
    delLib = (e) => {
        if (confirm("Are you sure you want to remove this library?")) {
            this.Model.delLibrary(this.LibraryView.clickedLib(e));
            this.LibraryView.updateLibView(this.Model.getLibraries);
        };
    };
    // Delete game and update view
    delGame = (e) => {
        if (confirm("Are you sure you want to remove this game?")) {
            this.Model.delGame(this.GameView.clickedGame(e));
            this.GameView.updateGameView(this.Model.activeLibrary);
            this.GameView.expandState = false;
        };
    };
};
