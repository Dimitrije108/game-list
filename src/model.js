const { format } = require("date-fns");
// Creates Game objects
class Game {
    constructor(game) {
        this._title = game.title;
        this._releaseDate = game.releaseDate;
        this._genre = game.genre;
        this._added = format(new Date(), 'dd/MM/yyyy');
        this._progress = game.progress;
        if (game.dateCompleted !== '') {
            this._dateCompleted = format(new Date(game.dateCompleted), 'dd/MM/yyyy');
        };
        this._mustPlay = game.mustPlay;
        this._rating = game.rating;
    };

    get title() {
        return this._title;
    };

    get releaseDate() {
        return this._releaseDate;
    };
    
    get genre() {
        return this._genre;
    };

    get added() {
        return this._added;
    };

    get progress() {
        return this._progress;
    };

    get dateCompleted() {
        return this._dateCompleted;
    };

    get mustPlay() {
        return this._mustPlay;
    };

    get rating() {
        return this._rating;
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
        this._activeGame = '';
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

    get activeGame() {
        return this._activeGame;
    };

    set activeGame(gameIndex) {
        if (gameIndex >= 0) {
            this._activeGame = this._activeLibrary[gameIndex];
        };
    };
    // Library methods
    addLibrary = (name) => this.getLibraries.push(new Library(name));
    renameLibrary = (libIndex, name) => this.getLibraries[libIndex].name = name;
    delLibrary = (libIndex) => this.getLibraries.splice(libIndex, 1);
    // Game methods
    addGame = (data) => this.activeLibrary.push(new Game(data));
    delGame = (gameIndex) => this.activeLibrary.splice(gameIndex, 1);
    editGame = (gameIndex, data) => this.activeLibrary[gameIndex] = new Game(data);
};

