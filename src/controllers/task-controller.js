import Task from '../components/task';
import TaskEdit from '../components/task-edit';
import {render, replace} from '../utils/render';
import {renderPositions} from '../utils/util';

const mode = {
  DEFAULT: `default`,
  EDIT: `edit`
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._task = null;
    this._taskEdit = null;
    this._onViewChange = onViewChange;
    this._mode = mode.DEFAULT;
  }

  render(taskObj) {
    const oldTask = this._task;
    const oldTaskEdit = this._taskEdit;

    this._task = new Task(taskObj);
    this._taskEdit = new TaskEdit(taskObj);

    this._task.setEditHandler(
        this._taskReplacementHandler(this._taskEdit, this._task)
    );
    this._taskEdit.setSubmitHandler(
        this._taskReplacementHandler(this._task, this._taskEdit)
    );
    this._task.setArchiveHandler(
        this._onDataChange(
            this,
            taskObj,
            Object.assign({}, taskObj, {isArchive: !taskObj.isArchive})
        )
    );
    this._task.setFavoritesHandler(
        this._onDataChange(
            this,
            taskObj,
            Object.assign({}, taskObj, {isFavorite: !taskObj.isFavorite})
        )
    );

    if (oldTask && oldTaskEdit) {
      replace(this._task, oldTask);
      replace(this._taskEdit, oldTaskEdit);
    } else {
      render(
          this._container.getElement(),
          this._task.getElement(),
          renderPositions.BEFOREEND
      );
    }
  }

  _taskReplacementHandler(newElement, replaceableElement) {
    const escPressHandler = (event) => {
      const isEscKey = event.key === `Escape` || event.key === `Esc`;
      if (isEscKey) {
        this._container.replaceChild(
            this._task.getElement(),
            this._taskEdit.getElement()
        );
        document.removeEventListener(`keydown`, escPressHandler);
      }
    };

    if (newElement instanceof TaskEdit) {
      return () => {
        this._onViewChange();

        this.changeCards(newElement, replaceableElement);

        this._mode = mode.EDIT;
        document.addEventListener(`keydown`, escPressHandler);
      };
    }

    return () => {
      this.changeCards(newElement, replaceableElement);

      this._mode = mode.DEFAULT;
    };
  }

  changeCards(newElement, replaceableElement) {
    this._container.getElement().replaceChild(newElement.getElement(), replaceableElement.getElement());
  }

  setDefaultView() {

    if (this._mode !== mode.DEFAULT) {
      this.changeCards(this._task, this._taskEdit);
      this._mode = mode.DEFAULT;
    }
  }
}
