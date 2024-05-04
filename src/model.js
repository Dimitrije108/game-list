// Creates Game objects
export class Game {
    constructor(title, releaseDate, genre, completed, mustPlay) {
        this._title = title;
        this._releaseDate = releaseDate;
        this._genre = genre;
        this._added = new Date();
        this._completed = completed;
        this._mustPlay = mustPlay;
    };

    get title() {
        this._title;
    };

    get releaseDate() {
        this._releaseDate;
    };
    
    get genre() {
        this._genre;
    };

    get added() {
        this._added;
    };

    get completed() {
        this._completed;
    };

    get mustPlay() {
        this._mustPlay;
    };

    set title(value) {
        this._title = value;
    };

    set releaseDate(value) {
        this._releaseDate = value;
    };
    
    set genre(value) {
        this._genre = value;
    };

    set completed(value) {
        this._completed = value;
    };

    set mustPlay(value) {
        this._mustPlay = value;
    };
};
// Handles Library logic
export class Library {
    constructor() {
        this._libraries = [[]];
        this._activeLibrary = this._libraries[0];
    }

    get getLibraries() {
        return this._libraries;
    }

    get activeLibrary() {
        return this._activeLibrary;
    }

    set activeLibrary(libIndex) {
        this._activeLibrary = this._libraries[libIndex];
    }

    addLibrary = () => this._libraries.push([]);

    delLibrary = (libIndex) => this._libraries.splice(libIndex, 1);

    addGame = (data) => this.activeLibrary.push(new Game(data));

    delGame = (gameIndex) => this.activeLibrary.splice(gameIndex, 1);
};