import { createForm, createInput, createDiv, createBtn, createIcon } from "./utils";
import penIcon from './assets/icons/pen-icon.svg';
import skullIcon from './assets/icons/skull-icon.svg';

export class LibraryView {
    constructor() {
        this.activeInput = false;
        this.renameInput = false;
        this.libTab = document.querySelector('.lib-tab');
    }
    
    addInput = () => {
        const form = createForm();
        form.appendChild(createInput());
        this.libTab.appendChild(form);
    };

    getInputValue = () => document.querySelector('#newLib').value;
    // Create and append library container
    addLibContainer = (name) => {
        const containerDiv = createDiv(undefined, 'lib-container');
        const nameDiv = createDiv(name, 'lib-name');
        // Rename button with pen svg icon
        const renameBtn = createBtn(undefined, 'lib-rename');
        const penSvg = createIcon('pen svg icon');
        penSvg.src = penIcon;
        renameBtn.appendChild(penSvg);
        // Delete button with trash can svg icon
        const delBtn = createBtn(undefined, 'lib-del');
        const trashCanSvg = createIcon('trash can svg icon');
        trashCanSvg.src = skullIcon;
        delBtn.appendChild(trashCanSvg);

        containerDiv.appendChild(nameDiv);
        containerDiv.appendChild(renameBtn);
        containerDiv.appendChild(delBtn);
        this.libTab.appendChild(containerDiv);
    };
    // Replace current library name div with a rename input field form
    addRenameInput = (e) => {
        const container = e.target.parentElement;
        const currentName = container.querySelector('.lib-name');
        const inputCurrentName = createInput();
        inputCurrentName.value = currentName.textContent;
        const form = createForm();
        form.appendChild(inputCurrentName);
        currentName.replaceWith(form);
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