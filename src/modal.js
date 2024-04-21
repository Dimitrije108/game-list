export const modalController = () => {
    const modal = document.querySelector('.modal');
    const addGameBtn = document.querySelector('.add-game');
    const modalBtn = document.querySelector('.modalBtn');

    addGameBtn.addEventListener('click', () => {
        modal.showModal();
    });

    // Call gameController when add game form is submitted
    // Need to modify/change so it works!
    modalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        gameController();
        modal.close();
    });

    // Close modal if a click is registered outside of the modal box
    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close();
        }
    });
}

