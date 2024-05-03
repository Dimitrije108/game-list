export class Controller {
    constructor() {
        this.Model = model;
        this.View = view;
        this.libTab = document.querySelector('.lib-tab');
        // Triggers when an input field is submitted;
        this.libTab.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleInput(this.View.getInputValue());
        });
        this.libTab.addEventListener('click', (e) => {
            e.target.classList.contains('lib-del') && delLib(e.target.parentElement);
            // Switch the active library to the one clicked
            e.target.classList.contains('lib-container') && switchLibrary(e.target);
            e.target.classList.contains('lib-name') && switchLibrary(e.target.parentElement);
        });
        this.submitModalBtn = document.querySelector('.submitModalBtn');
        // Triggers when Game form is submitted;
        this.submitModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleAddGame();
            // call Controller's handleAddGame which will:
            // call this.Library.addGame(library, data);
            // call this.View.updateGameView;
        });
    };
    handleAddGame() {
        this.Model.addGame()
        this.View.modal.close();
    };
    // Submitted input field - rename library or create one
    handleInput(inputValue) {
        if (inputValue.length < 1) return;
        if (this.View.renameInput) {
            this.View.addRenameDiv(inputValue);
            this.View.renameInput = false;
        } else {
            this.Model.addLibrary();
            this.View.addLibrary(inputValue);
            this.View.activeInput = false;
        };
    };
    // Clicked library becomes the active library
    switchLibrary = (e) => this.Model.activeLibrary = this.View.clickedLib(e);
    // Delete library and update view
    delLib = (e) => {
        if (confirm("Are you sure you want to remove this library?")) {
            this.Model.delLibrary(this.View.clickedLib(e));
            this.View.updateLibView();
        };
    };
}
