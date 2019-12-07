import Task from '../components/task';
import TaskEdit from '../components/task-edit';
import {renderPositions} from '../utils/util';
import {remove, render} from "../utils/render";
import NoTasks from '../components/no-tasks';
import LoadMoreButton from '../components/load-more-button';
import Sort from '../components/sort';
import Tasks from '../components/tasks';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

export default class BoardController {
  constructor(elementToJoin) {
    this._elementToJoin = elementToJoin;
    this._loadMoreButton = new LoadMoreButton();
    this._sort = new Sort();
    this._tasks = new Tasks();
  }

  render(tasks) {
    let showTasksCount = SHOWING_TASKS_COUNT_ON_START;
    const board = this._elementToJoin;

    const renderTask = (taskObj) => {
      const task = new Task(taskObj);
      const taskEdit = new TaskEdit();

      const escPressHandler = (event) => {
        const isEscKey = event.key === `Escape` || event.key === `Esc`;
        if (isEscKey) {
          this._tasks.replaceChild(task.getElement(), taskEdit.getElement());
          document.removeEventListener(`keydown`, escPressHandler);
        }
      };
      const taskReplacementHandler = (newElement, replaceableElement) => {
        if (newElement instanceof TaskEdit) {
          return () => {
            this._tasks
              .getElement()
              .replaceChild(
                  newElement.getElement(),
                  replaceableElement.getElement()
              );
            document.addEventListener(`keydown`, escPressHandler);
          };
        }

        return () =>
          this._tasks
            .getElement()
            .replaceChild(
                newElement.getElement(),
                replaceableElement.getElement()
            );
      };

      task.setEditHandler(taskReplacementHandler(taskEdit, task));
      taskEdit.setSubmitHandler(taskReplacementHandler(task, taskEdit));

      render(
          this._tasks.getElement(),
          task.getElement(),
          renderPositions.BEFOREEND
      );
    };

    const showMoreButtonClickHandler = () => {
      const prevTasksCount = showTasksCount;

      showTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks
        .slice(prevTasksCount, showTasksCount)
        .forEach((el) => renderTask(el));

      if (showTasksCount >= tasks.length) {
        remove(this._loadMoreButton);
      }
    };

    const renderTasks = () => {
      const isAllTasksArchived = tasks.every((task) => task.isArchive);

      if (isAllTasksArchived) {
        render(
            board.getElement(),
            new NoTasks().getElement(),
            renderPositions.AFTERBEGIN
        );
      } else {
        render(board.getElement(), this._sort.getElement(), renderPositions.BEFOREEND);
        render(board.getElement(), this._tasks.getElement(), renderPositions.BEFOREEND);

        tasks
          .slice(0, SHOWING_TASKS_COUNT_ON_START)
          .forEach((el) => renderTask(el));
        if (tasks.length > showTasksCount) {
          render(board.getElement(), this._loadMoreButton.getElement(), renderPositions.BEFOREEND);
          this._loadMoreButton.setClickButtonHandler(showMoreButtonClickHandler);
        }
      }
    };

    renderTasks();

  }
}
