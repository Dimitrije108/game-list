import { createForm, createInput, createDiv, createBtn, appendEl, delEl, libTab, clickedLib } from "./utils";
import { getLibraries } from "./library-logic";
export { inputController, createLibInput, renameController, switchLibrary };

let activeInput = false;
let renameInput = false;

// If no input field is present, create one, otherwise, focus it;
const createLibInput = () => {
    if (!activeInput && !renameInput) {
        const form = appendEl(createForm(), createInput());
        appendEl(libTab, form);
        activeInput = true;
    }
    const selectInput = document.querySelector('#newLib');
    selectInput.focus();
};
// Create library container
const createLibContainer = (name) => {
    const containerDiv = createDiv(undefined, 'lib-container');
    const nameDiv = createDiv(name, 'lib-name');
    const renameBtn = createBtn('rename', 'lib-rename');
    const delBtn = createBtn('del', 'lib-del');

    appendEl(containerDiv, nameDiv);
    appendEl(containerDiv, renameBtn);
    appendEl(containerDiv, delBtn);
    return containerDiv;
};
// Controls submitted input field:
// Create new library or Create renamed div
const inputController = () => {
    const selectForm = document.querySelector('.newForm');
    const selectInput = document.querySelector('#newLib');
    if (selectInput.value.length < 1) return;
    if (renameInput) {
        createRenameDiv(selectInput.value);
        renameInput = false;
    } else {
        const newLibDiv = createLibContainer(selectInput.value);
        appendEl(libTab, newLibDiv);
        delEl(selectForm);
        activeInput = false;
        return true;
    };
};
// Replace current library name div with an input field form
const createRenameInput = (e) => {
    const container = e.target.parentElement;
    const currentName = container.querySelector('.lib-name');
    const inputCurrentName = createInput();
    inputCurrentName.value = currentName.textContent;
    const form = appendEl(createForm(), inputCurrentName);
    currentName.replaceWith(form);
};
// Replace the input field with the renamed div
const createRenameDiv = (e) => {
    const form = document.querySelector('.newForm');
    const renamedDiv = createDiv(e);
    renamedDiv.classList.add('lib-name');
    form.replaceWith(renamedDiv);
};
// Create an input to rename a div or
// focus the one that is already active
const renameController = (e) => {
    if (activeInput) return;
    if (!renameInput) {
        createRenameInput(e);
        renameInput = true;
    };
    const selectInput = document.querySelector('#newLib');
    selectInput.focus();
};
// Returns the library that was clicked/switched to
const switchLibrary = (e) => {
    const activeLib = getLibraries()[clickedLib(e)];
    return activeLib;
};
