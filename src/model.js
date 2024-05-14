const { format } = require("date-fns");
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
};
// Creates Game objects
class Game {
    constructor(game, dateAdded) {
        this._title = game.title;
        this._releaseDate = game.releaseDate;
        this._genre = game.genre;
        // Keep the same added date value if game obj is edited, instead of creating a new date
        // This is because editing an existing game object creates a new object
        this._added = dateAdded || format(new Date(), 'dd/MM/yyyy');
        this._progress = game.progress;
        this.setDateCompleted(game.dateCompleted);
        this._mustPlay = game.mustPlay;
        this._rating = game.rating;
    };
    // If it includes '-' then it's submitted via the built in form calendar and needs to be formatted
    // otherwise it is already in the correct format when loaded from the local storage
    // this is because when you try and format the already formatted date it switches day with month
    setDateCompleted = (dateCompleted) => {
        if (dateCompleted !== '') {
            if (dateCompleted.includes('-')) {
                this._dateCompleted = format(new Date(dateCompleted), 'dd/MM/yyyy');
            } else {
                this._dateCompleted = dateCompleted;
            };
        };
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

    set added(value) {
        this._added = value;
    };

    get progress() {
        return this._progress;
    };

    set progress(value) {
        this._progress = value;
    };

    get dateCompleted() {
        return this._dateCompleted;
    };

    set dateCompleted(value) {
        this._dateCompleted = value;
    };

    get mustPlay() {
        return this._mustPlay;
    };

    set mustPlay(value) {
        this._mustPlay = value;
    };

    get rating() {
        return this._rating;
    };

    set rating(value) {
        this._rating = value;
    };
};
// Handles app model logic
export class Model {
    constructor() {
        // The default library
        this._collection = new Library('Collection');
        // User created libraries
        this._libraries = [];
        this._activeLibrary = this._collection.array;
        this._activeGame = '';
    };

    get collection() {
        return this._collection;
    };

    get getLibraries() {
        return this._libraries;
    };

    get activeLibrary() {
        return this._activeLibrary;
    };

    set activeLibrary(libIndex) {
        this._activeLibrary = libIndex >= 0 ? this._libraries[libIndex].array : this._collection.array;
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
    editGame = (data) => {
        const gameIndex = this.activeLibrary.indexOf(this.activeGame);
        this.activeLibrary.splice(gameIndex, 1, new Game(data, this.activeGame.added));
    };
    delGame = (gameIndex) => this.activeLibrary.splice(gameIndex, 1);
    // Saves libraries and games inside the local storage every time one of them is updated
    saveData = () => {
        localStorage.setItem('collection', JSON.stringify(this.collection.array));
        localStorage.setItem('libraries', JSON.stringify(this.getLibraries));
    };
    // Because the game properties are private and JSON doesn't store class methods
    // getters and setters aren't available, I've had to re-format the values so
    // they're accepted by the Game class constructor
    convertData = (game) => {
        const gameData = {
            title: game._title,
            releaseDate: game._releaseDate,
            genre: game._genre,
            progress: game._progress,
            dateCompleted: game._dateCompleted,
            mustPlay: game._mustPlay,
            rating: game._rating,
        };
        return gameData;
    };
    // Loads saved libraries and games from the local storage when the app is started
    loadData = () => {
        // Convert JSON strings back to usable data
        const storedCollection = JSON.parse(localStorage.getItem('collection'));
        const storedLibraries = JSON.parse(localStorage.getItem('libraries'));
        // For each game in the default library re-create the stored game objects
        storedCollection.forEach((game) => {
            const loadGame = new Game(this.convertData(game), game._added);
            this.collection.array.push(loadGame);
        });
        // For each user created library re-create them and games inside them
        storedLibraries.forEach((library) => {
            const loadLibrary = new Library(library._name);
            library._array.forEach((game) => {
                const loadGame = new Game(this.convertData(game), game._added);
                loadLibrary.array.push(loadGame);
            });
            this.getLibraries.push(loadLibrary);
        });
    };
};

