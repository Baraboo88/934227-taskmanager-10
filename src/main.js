import SiteMenu from './components/site-menu';
import Board from './components/board';
import {generateTasks} from './mock/task';
import {renderPositions} from './utils/util';
import {render} from "./utils/render";
import BoardController from "./controllers/board-controller";
import TasksModel from './models/tasks-model';
import FilterController from './controllers/filter-controller';

const NUMBER_OF_ARTICLES = 3;
const mainControl = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);
const board = new Board();
const tasks = generateTasks(NUMBER_OF_ARTICLES);
const tasksModel = new TasksModel(tasks);
const siteMenu = new SiteMenu();
tasksModel.setTasks(tasks);
const filterController = new FilterController(main, tasksModel);

render(mainControl, siteMenu.getElement(), renderPositions.BEFOREEND);

filterController.render();

render(main, board.getElement(), renderPositions.BEFOREEND);

const boardController = new BoardController(board, tasksModel, filterController, siteMenu);

boardController.render();
