export { createForm, createInput, createDiv, createBtn, appendEl, delEl, libTab, clickedLib };

const libTab = document.querySelector('.lib-tab');

// Determines which library was clicked
const clickedLib = (e) => {
    const libTab = document.querySelector('.lib-tab');
    const libraryList = [...libTab.children];
    const clickedLib = libraryList.indexOf(e);
    return clickedLib;
};

const createForm = () => {
    const newForm = document.createElement('form');
    newForm.classList.add('newForm');
    return newForm;
};

const createInput = () => {
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('id', 'newLib');
    newInput.setAttribute('name', 'newLib');
    newInput.setAttribute('placeholder', 'Name');
    newInput.setAttribute('minlength', '1');
    newInput.setAttribute('maxlength', '20');
    return newInput;
};

const createDiv = (txtContent, className) => {
    const newDiv = document.createElement('div');
    newDiv.textContent = txtContent;
    newDiv.classList.add(className);
    return newDiv;
}

const createBtn = (txtContent, className) => {
    const newBtn = document.createElement('button');
    newBtn.textContent = txtContent;
    newBtn.classList.add(className);
    return newBtn;
}
// Append element
const appendEl = (parent, child) => {
    parent.appendChild(child);
    return parent;
};
// Delete element
const delEl = (el) => {
    el.remove();
};