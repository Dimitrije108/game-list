import { createForm, createInput, createDiv, createBtn, createEditIcon, createTrashIcon, createCancelIcon } from "./utils";

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
    // Toggle active library styling to indicate if a library is active
    toggleActiveLibStyle = () => this.activeLib.classList.toggle('active-lib');
    
    addInput = () => {
        const containerDiv = createDiv(undefined, 'input-container');
        const form = createForm();
        form.appendChild(createInput());
        containerDiv.appendChild(form);
        createCancelIcon(containerDiv);
        this.libTab.appendChild(containerDiv);
        
        const svg = document.querySelector('.cancel-svg');
        const svgStroke = svg.querySelector('.cancel-svg-style');
        // Change cancel icon color to red when hovered over
        svg.addEventListener('mouseover', () => svgStroke.style.stroke = 'red');
        // Change it back to standard
        svg.addEventListener('mouseout', () => svgStroke.style.stroke = '#000000');
    };

    getInputValue = () => document.querySelector('#lib-input').value;
    // Create and append library container
    addLibContainer = (name) => {
        const containerDiv = createDiv(undefined, 'lib-container');
        const nameDiv = createDiv(name, 'lib-name');
        // Create rename button with edit svg icon
        const renameBtn = createBtn(undefined, 'lib-rename');
        renameBtn.title = 'Rename';
        createEditIcon(renameBtn);
        // Create delete button with trash can svg icon
        const delBtn = createBtn(undefined, 'lib-del');
        delBtn.title = 'Delete';
        createTrashIcon(delBtn);

        containerDiv.appendChild(nameDiv);
        containerDiv.appendChild(renameBtn);
        containerDiv.appendChild(delBtn);
        this.libTab.appendChild(containerDiv);
        // Change trash icon color to red when hovering over button
        delBtn.addEventListener('mouseover', () => {
            const svg = delBtn.querySelector('.trash-icon');
            svg.style.fill = 'red';
        });
        // Change it back to standard
        delBtn.addEventListener('mouseout', () => {
            const svg = delBtn.querySelector('.trash-icon');
            svg.style.fill = '#111918';
        });
    };
    // Replace current library name div with a rename input field form
    addRenameInput = (e) => {
        const container = e;
        const currentName = container.querySelector('.lib-name');
        const inputCurrentName = createInput();
        inputCurrentName.value = currentName.textContent;
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