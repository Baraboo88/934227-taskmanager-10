import SiteMenu from './components/site-menu';
import Filter from './components/filter';
import Board from './components/board';
import {generateTasks} from './mock/task';
import {renderPositions} from './utils/util';
import {render} from "./utils/render";
import BoardController from "./controllers/BoardController";

const NUMBER_OF_ARTICLES = 20;
const mainControl = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);
const board = new Board();
const tasks = generateTasks(NUMBER_OF_ARTICLES);

render(mainControl, new SiteMenu().getElement(), renderPositions.BEFOREEND);
render(main, new Filter(tasks).getElement(), renderPositions.BEFOREEND);
render(main, board.getElement(), renderPositions.BEFOREEND);

const boardController = new BoardController(board);
boardController.render(tasks);
