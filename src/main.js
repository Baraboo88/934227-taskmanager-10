import SiteMenu from './components/site-menu';
import Filter from './components/filter';
import Board from './components/board';
import TaskEdit from './components/task-edit';
import Task from './components/task';
import LoadMoreButton from './components/load-more-button';
import {generateTasks} from './mock/task';
import {render, renderPositions} from './util';

const NUMBER_OF_ARTICLES = 30;

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;
let showTasksCount = SHOWING_TASKS_COUNT_ON_START;
const mainControl = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);
const tasks = generateTasks(NUMBER_OF_ARTICLES);
const board = new Board();
const loadMoreButton = new LoadMoreButton();

render(mainControl, new SiteMenu().getElement(), renderPositions.BEFOREEND);
render(main, new Filter(tasks).getElement(), renderPositions.BEFOREEND);
render(main, board.getElement(), renderPositions.BEFOREEND);

const boardTasks = document.querySelector(`.board__tasks`);

render(board.getElement(), loadMoreButton.getElement(), renderPositions.BEFOREEND);


const renderTask = (taskObj) => {
  const task = new Task(taskObj);
  const taskEdit = new TaskEdit();
  const editButton = task.getElement().querySelector(`.card__btn--edit`);
  const taskReplacementHandler = (newElement, replaceableElement) => () =>
    boardTasks.replaceChild(newElement, replaceableElement);

  editButton.addEventListener(`click`, taskReplacementHandler(taskEdit.getElement(), task.getElement()));

  const editForm = taskEdit.getElement().querySelector(`form`);

  editForm.addEventListener(`submit`, taskReplacementHandler(task.getElement(), taskEdit.getElement())
  );

  render(boardTasks, task.getElement(), renderPositions.BEFOREEND);
};

tasks.slice(0, SHOWING_TASKS_COUNT_ON_START).forEach((el) => renderTask(el));

loadMoreButton.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showTasksCount;

  showTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showTasksCount).forEach((el) => renderTask(el));

  if (showTasksCount >= NUMBER_OF_ARTICLES) {
    loadMoreButton.getElement().remove();
    loadMoreButton.removeElement();
  }
});
