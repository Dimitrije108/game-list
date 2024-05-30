import { createForm, createInput, createDiv, createBtn, createEditIcon, createTrashIcon, createCancelIcon, addHoverEffect } from "./utils";

export class LibraryView {
    constructor() {
        this.activeInput = false;
        this.renameInput = false;
        this.libTab = document.querySelector('.lib-tab');
        this._activeLib = document.querySelector('.lib-main');
    };

    get activeLib() {
        return this._activeLib;
    }

    set activeLib(container) {
        this._activeLib = container;
    };
    // Retrieves input field value
    getInputValue = () => document.querySelector('#lib-input').value;
    // Toggle active library styling to indicate if a library is active
    toggleActiveLibStyle = () => this.activeLib.classList.toggle('active-lib');
    // Adds an input field to type in a new library's name and cancel icon to cancel the input
    addInput = () => {
        const containerDiv = createDiv(undefined, 'input-container');

        const form = createForm();
        form.appendChild(createInput());
        containerDiv.appendChild(form);
        // Create the X svg button to delete the input field
        const cancelBtn = createBtn(undefined, 'input-cancel', 'Cancel');
        createCancelIcon(cancelBtn);
        containerDiv.appendChild(cancelBtn);

        this.libTab.appendChild(containerDiv);
        // Cancel svg turns red when hovered over
        const svg = cancelBtn.querySelector('.cancel-svg-style');
        addHoverEffect(cancelBtn, svg, 'stroke');
    };
    // Create and append library container
    addLibContainer = (name) => {
        const containerDiv = createDiv(undefined, 'lib-container');
        const nameDiv = createDiv(name, 'lib-name', name);
        // Create rename button with edit svg icon
        const renameBtn = createBtn(undefined, 'lib-rename', 'Rename');
        createEditIcon(renameBtn, 18);
        // Create delete button with trash can svg icon
        const delBtn = createBtn(undefined, 'lib-del', 'Delete');
        createTrashIcon(delBtn, 18);

        containerDiv.appendChild(nameDiv);
        containerDiv.appendChild(renameBtn);
        containerDiv.appendChild(delBtn);
        this.libTab.appendChild(containerDiv);
        // Delete icon turns red when hovered over
        const svg = delBtn.querySelector('.trash-icon');
        addHoverEffect(delBtn, svg, 'fill');
    };
    // Replace current library name div with a rename input field form
    addRenameInput = (container) => {
        const currentName = container.querySelector('.lib-name');
        const inputCurrentName = createInput();
        inputCurrentName.value = currentName.textContent;
        inputCurrentName.style.padding = '0.2rem 0.4rem';
        const form = createForm();
        form.appendChild(inputCurrentName);
        currentName.replaceWith(form);
    };
    // Replace the input field with the renamed div
    addRenameDiv = (value) => {
        const form = document.querySelector('.lib-form');
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