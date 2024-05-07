export class Controller {
    constructor(LibraryModel, GameView, LibraryView) {
        this.Model = LibraryModel;
        this.GameView = GameView;
        this.LibraryView = LibraryView;
        this.collection = document.querySelector('.lib-main');
        // Switches to the Collection library
        this.collection.addEventListener('click', () => this.switchLibrary());
        this.libTab = document.querySelector('.lib-tab');
        // Triggers when an input field is submitted
        this.libTab.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddLibrary(this.LibraryView.getInputValue());
        });
        this.libTab.addEventListener('click', (e) => {
            e.target.classList.contains('lib-del') && this.delLib(e.target.parentElement);
            // Switch the active library to the one clicked
            e.target.classList.contains('lib-container') && this.switchLibrary(e.target);
            e.target.classList.contains('lib-name') && this.switchLibrary(e.target.parentElement);
        });
        this.submitModalBtn = document.querySelector('.submitModalBtn');
        // Triggers when Game form is submitted;
        this.submitModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleAddGame();
        });
    };
    // Adds new game to library and updates view
    handleAddGame() {
        this.Model.addGame(this.GameView.getFormData());
        this.GameView.modal.close();
        this.GameView.updateGameView(this.Model.activeLibrary);
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
    // Clicked library becomes the active library
    switchLibrary = (e) => this.Model.activeLibrary = this.LibraryView.clickedLib(e);
    // Delete library and update view
    delLib = (e) => {
        if (confirm("Are you sure you want to remove this library?")) {
            this.Model.delLibrary(this.LibraryView.clickedLib(e));
            this.LibraryView.updateLibView(this.Model.getLibraries);
        };
    };
};
