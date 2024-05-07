import html from "./index.html";
import './style.css';
import { Model } from "./model.js";
import { GameView, LibraryView } from "./view.js";
import { Controller } from "./controller.js";

const gameList = new Controller(new Model(), new GameView(), new LibraryView());