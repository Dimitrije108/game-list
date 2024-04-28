// Converts add game modal form data to be used by Game class
const gameFormData = () => {
    const title = document.querySelector('#title').value;
    const releaseDate = document.querySelector('#release-date').value;
    const genre = document.querySelector('#genre').value;
    const completed = document.querySelector('#completed').value;
    const mustPlay = document.querySelector('#must-play').value;
    
    return {
        title,
        releaseDate,
        genre,
        completed,
        mustPlay,
    }
}

export default gameFormData;