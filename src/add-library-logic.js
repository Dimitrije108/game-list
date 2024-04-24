export const addLib = () => {
    const addLibBtn = document.querySelector('.lib-add');
    const libTab = document.querySelector('.lib-tab');
    let activeInput = false;
    let renameInput = false;

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

    const createForm = () => {
        const newForm = document.createElement('form');
        newForm.classList.add('newForm');
        return newForm;
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
    // Create library container with elements inside
    const createLibDiv = (name) => {
        const newDivContainer = createDiv(undefined, 'lib-container');
        const newDiv = createDiv(name, 'lib-name');
        const newRenameBtn = createBtn('rename', 'lib-rename');
        const newDelBtn = createBtn('del', 'lib-del');

        appendEl(newDivContainer, newDiv);
        appendEl(newDivContainer, newRenameBtn);
        appendEl(newDivContainer, newDelBtn);
        return newDivContainer;
    };
    // Replace current library name div with an input field form
    const createRenameInput = (e) => {
        const container = e.target.parentElement;
        const currentName = container.querySelector('.lib-name');
        const inputCurrentName = createInput();
        inputCurrentName.value = currentName.textContent;
        const form = appendEl(createForm(), inputCurrentName);
        currentName.replaceWith(form);
        inputCurrentName.focus();
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
    const renameInputController = (e) => {
        if (activeInput) return;
        if (!renameInput) {
            createRenameInput(e);
            renameInput = true;
        } else {
            const selectInput = document.querySelector('#newLib');
            selectInput.focus();
        }
    };

    const delLibController = (e) => {
        if (confirm("Are you sure you want to remove this library?")) {
            const container = e.target.parentElement;
            delEl(container);
        }
    };
    // Controls submitted input field: If input value > 0
    // Create new library and remove the input field
    // If rename input = true - Create renamed div
    const inputController = () => {
        const selectForm = document.querySelector('.newForm');
        const selectInput = document.querySelector('#newLib');
        if (selectInput.value.length < 1) return;
        if (renameInput) {
            createRenameDiv(selectInput.value);
            renameInput = false;
        } else {
            const newLibDiv = createLibDiv(selectInput.value);
            appendEl(libTab, newLibDiv);
            delEl(selectForm);
            activeInput = false;
        }
    };
    // If no input field is present, create one, otherwise, focus it;
    const libController = () => {
        if (!activeInput && !renameInput) {
            const form = appendEl(createForm(), createInput());
            appendEl(libTab, form);
            activeInput = true;
        }
        const selectInput = document.querySelector('#newLib');
        selectInput.focus();
    };
    // rename and delete buttons
    libTab.addEventListener('click', (e) => {
        if (e.target.classList.contains('lib-rename')) {
            renameInputController(e);
        }
        if (e.target.classList.contains('lib-del')) {
            delLibController(e);
        }
    });
    // Triggers when an input field is submitted;
    libTab.addEventListener('submit', (e) => {
        e.preventDefault();
        inputController();
    });

    addLibBtn.addEventListener('click', () => {
        libController();
    });
}