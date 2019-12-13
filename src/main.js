import SiteMenu from './components/site-menu';
import Filter from './components/filter';
import Board from './components/board';
import {generateTasks} from './mock/task';
import {renderPositions} from './utils/util';
import {render} from "./utils/render";
import BoardController from "./controllers/board-controller";

const NUMBER_OF_ARTICLES = 3;
const mainControl = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);
const board = new Board();
const tasks = generateTasks(NUMBER_OF_ARTICLES);
const filter = new Filter(tasks);

render(mainControl, new SiteMenu().getElement(), renderPositions.BEFOREEND);
render(main, filter.getElement(), renderPositions.BEFOREEND);
render(main, board.getElement(), renderPositions.BEFOREEND);

const boardController = new BoardController(board, filter);
boardController.render(tasks);
