import html from "./index.html";

class Game {
    constructor(title, releaseDate, genre, mustPlay, completed) {
        this._title = title;
        this._releaseDate = releaseDate;
        this._genre = genre;
        this._added = new Date();
        this._mustPlay = mustPlay;
        this._completed = completed;
    }

    set title(value) {
        this._title = value;
    }

    set releaseDate(value) {
        this._releaseDate = value;
    }

    set genre(value) {
        this._genre = value;
    }

    set mustPlay(value) {
        this._mustPlay = value;
    }

    set completed(value) {
        this._completed = value;
    }
}

const fallout = new Game('Fallout', '1997', 'RPG', 'Yes', 'No');

console.table(fallout);

