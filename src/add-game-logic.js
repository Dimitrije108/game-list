// Creates Game objects and stores them in library array
export default class Game {
    constructor(title, releaseDate, genre, completed, mustPlay) {
        this._title = title;
        this._releaseDate = releaseDate;
        this._genre = genre;
        this._added = new Date();
        this._completed = completed;
        this._mustPlay = mustPlay;
    }

    set title(value) {
        this._title = value;
    }

    set releaseDate(value) {
        this.__releaseDate = value;
    }
    
    set genre(value) {
        this._genre = value;
    }

    set completed(value) {
        this._completed = value;
    }

    set mustPlay(value) {
        this._mustPlay = value;
    }
}
