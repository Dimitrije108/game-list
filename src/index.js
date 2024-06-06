// eslint-disable-next-line no-unused-vars
import html from './index.html';
import './style.css';
import { Model } from './model.js';
import { GameView } from './gameView.js';
import { LibraryView } from './libraryView.js';
import { Controller } from './controller.js';

const gameList = new Controller(new Model(), new GameView(), new LibraryView());
gameList.initData();
