export { createForm, createInput, createDiv, createBtn, createIcon };

const createForm = () => {
    const newForm = document.createElement('form');
    newForm.classList.add('newForm');
    return newForm;
};

const createInput = () => {
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.id = 'newLib';
    newInput.name = 'newLib';
    newInput.placeholder = 'Name';
    newInput.minLength = 1;
    newInput.maxLength = 30;
    return newInput;
};

const createDiv = (txtContent, className) => {
    const newDiv = document.createElement('div');
    newDiv.textContent = txtContent;
    newDiv.classList.add(className);
    return newDiv;
};

const createBtn = (txtContent, className) => {
    const newBtn = document.createElement('button');
    newBtn.textContent = txtContent;
    newBtn.classList.add(className);
    return newBtn;
};

const createIcon = (alt) => {
    const newImg = document.createElement('img');
    newImg.alt = alt;
    newImg.width = '20';
    newImg.height = '20';
    return newImg;
};