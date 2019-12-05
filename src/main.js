import SiteMenu from './components/site-menu';
import Filter from './components/filter';
import Board from './components/board';
import TaskEdit from './components/task-edit';
import Task from './components/task';
import LoadMoreButton from './components/load-more-button';
import {generateTasks} from './mock/task';
import {render, renderPositions} from './util';
import NoTasks from './components/no-tasks';

const NUMBER_OF_ARTICLES = 3;

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

const renderTask = (taskObj) => {
  const task = new Task(taskObj);
  const taskEdit = new TaskEdit();
  const editButton = task.getElement().querySelector(`.card__btn--edit`);
  const escPressHandler = (event) => {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;
    if (isEscKey) {
      boardTasks.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, escPressHandler);
    }
  };
  const taskReplacementHandler = (newElement, replaceableElement) => {
    if (newElement instanceof TaskEdit) {
      return () => {
        boardTasks.replaceChild(newElement.getElement(), replaceableElement.getElement()
        );
        document.addEventListener(`keydown`, escPressHandler);
      };
    }

    return () =>
      boardTasks.replaceChild(newElement.getElement(), replaceableElement.getElement()
      );
  };

  editButton.addEventListener(`click`, taskReplacementHandler(taskEdit, task));

  const editForm = taskEdit.getElement().querySelector(`form`);

  editForm.addEventListener(`submit`, taskReplacementHandler(task, taskEdit));

  render(boardTasks, task.getElement(), renderPositions.BEFOREEND);
};

const renderTasks = () => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    while (board.getElement().firstChild) {
      board.getElement().removeChild(board.getElement().firstChild);
    }
    render(board.getElement(), new NoTasks().getElement(), renderPositions.AFTERBEGIN
    );
  } else if (tasks.length > showTasksCount) {
    render(board.getElement(), loadMoreButton.getElement(), renderPositions.BEFOREEND);
  }

  tasks.slice(0, SHOWING_TASKS_COUNT_ON_START).forEach((el) => renderTask(el));
};

const showMoreButtonClickHandler = () => {
  const prevTasksCount = showTasksCount;

  showTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showTasksCount).forEach((el) => renderTask(el));

  if (showTasksCount >= NUMBER_OF_ARTICLES) {
    loadMoreButton.getElement().remove();
    loadMoreButton.removeElement();
  }
};

renderTasks();

loadMoreButton
  .getElement()
  .addEventListener(`click`, showMoreButtonClickHandler);
