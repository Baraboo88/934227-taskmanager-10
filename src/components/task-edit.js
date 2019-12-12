import flatpickr from 'flatpickr';
import AbstractSmartComponent from './abstract-smart-component';
import {COLORS, formatAMPM, formatDate} from './../utils/util';
const addCreatEditBlock = (task, taskToUpdateObj) => {
  const {tags, description, dueDate, color} = task;
  const {activeRepeatingDays, isRepeatingTask, isDateShowing} = taskToUpdateObj;
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isBlockSaveButton =
    (isDateShowing && isRepeatingTask) || (!isRepeatingTask && !isDateShowing);
  const date = isDateShowing && dueDate ? formatDate(dueDate) : ``;
  const time = isDateShowing && dueDate ? formatAMPM(dueDate) : ``;
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const renderRepeating = () => {
    return Object.keys(activeRepeatingDays)
      .map((day) => {
        return `<input
                class="visually-hidden card__repeat-day-input"
                type="checkbox"
                id="repeat-${day}-1"
                name="repeat"
                value="${day}"
                ${activeRepeatingDays[day] ? `checked` : ``}
                 />
                <label class="card__repeat-day" for="repeat-${day}-1">${day}</label>`;
      })
      .join(`\n`);
  };

  const renderColors = () => {
    return COLORS.map((colorEl) => {
      return ` <input
              type="radio"
              id="color-${colorEl}-1"
              class="card__color-input card__color-input--${colorEl} visually-hidden"
              name="color"
              value="${colorEl}"
            />
            <label
              for="color-${colorEl}-1"
              class="card__color card__color--${colorEl}"
            >${colorEl}</label
            >`;
    }).join(`\n`);
  };

  const renderHashTags = () => {
    return [...tags]
      .map((tag) => {
        return `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value=${tag}
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name">
            #${tag}
          </p>
          <button
              type="button"
              class="card__hashtag-delete"
          >
            delete
          </button>
        </span>`;
      })
      .join(`\n`);
  };

  return `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}" >
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__color-bar">
                  <svg width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${description}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder=""
                            name="date"
                            value="${date} ${time}"
                          />
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${taskToUpdateObj.isRepeatingTask ? `yes` : `no`}</span>
                      </button>
                        
                      <fieldset class="card__repeat-days" ${taskToUpdateObj.isRepeatingTask ? `` : `disabled`} >
                        <div class="card__repeat-days-inner">
                        ${renderRepeating()}
        </div>
        </fieldset>
        </div>

        <div class="card__hashtag">
          <div class="card__hashtag-list">
          ${renderHashTags()}
          </div>

          <label>
            <input
              type="text"
              class="card__hashtag-input"
              name="hashtag-input"
              placeholder="Type new hashtag here"
            />
          </label>
        </div>
        </div>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
              ${renderColors()}
          </div>
        </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit" ${isBlockSaveButton ? `disable` : ``}>save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
        </div>
        </form>
        </article>`;
};

export default class TaskEdit extends AbstractSmartComponent {
  constructor(task) {
    super();
    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._flatpickr = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return addCreatEditBlock(this._task, {
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      activeRepeatingDays: this._activeRepeatingDays,
    });
  }

  recoveryListener() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const dateElement = this.getElement().querySelector(`.card__date`);
      this._flatpickr = flatpickr(dateElement, {
        altInput: true,
        allowInput: true,
        enableTime: true,
        defaultDate: this._task.dueDate,
      });
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element
      .querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, () => {
        this._isDateShowing = !this._isDateShowing;
        this.rerender();
      });

    element
      .querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, () => {
        this._isRepeatingTask = !this._isRepeatingTask;
        this.rerender();
      });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      });
    }
  }

  setSubmitHandler(handler) {
    this.getElement()
      .querySelector(`form`)
      .addEventListener(`submit`, handler);
  }
}
