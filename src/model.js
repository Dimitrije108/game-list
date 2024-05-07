const { format } = require("date-fns");
// Creates Game objects
class Game {
    constructor(game) {
        this._title = game.title;
        this._releaseDate = game.releaseDate;
        this._genre = game.genre;
        this._added = format(new Date(), 'dd/MM/yyyy');
        this._completed = game.completed;
        this._mustPlay = game.mustPlay;
    };

    get title() {
        return this._title;
    };

    set title(value) {
        this._title = value;
    };

    get releaseDate() {
        return this._releaseDate;
    };

    set releaseDate(value) {
        this._releaseDate = value;
    };
    
    get genre() {
        return this._genre;
    };

    set genre(value) {
        this._genre = value;
    };

    get added() {
        return this._added;
    };

    get completed() {
        return this._completed;
    };

    set completed(value) {
        this._completed = value;
    };

    get mustPlay() {
        return this._mustPlay;
    };
    
    set mustPlay(value) {
        this._mustPlay = value;
    };
};
// Creates Library objects
class Library {
    constructor(name) {
        this._name = name;
        this._array = [];
    };

    get name() {
        return this._name;
    };

    set name(value) {
        this._name = value;
    };

    get array() {
        return this._array;
    };
}
// Handles app model logic
export class Model {
    constructor() {
        this._collection = new Library('Collection');
        this._libraries = [];
        this._activeLibrary = this._collection.array;
    };

    get getLibraries() {
        return this._libraries;
    };

    get collection() {
        return this._collection;
    }

    get activeLibrary() {
        return this._activeLibrary;
    };

    set activeLibrary(libIndex) {
        this._activeLibrary = libIndex >= 0 ? this._libraries[libIndex].array : this._collection;
    };

    addLibrary = (name) => this.getLibraries.push(new Library(name));
    renameLibrary = (libIndex, name) => this.getLibraries[libIndex].name = name;
    delLibrary = (libIndex) => this.getLibraries.splice(libIndex, 1);

    addGame = (data) => this.activeLibrary.push(new Game(data));
    delGame = (gameIndex) => this.activeLibrary.splice(gameIndex, 1);
};

