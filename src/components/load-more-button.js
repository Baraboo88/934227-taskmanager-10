import AbstractComponent from './abstract-component';

const addLoadMore = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return addLoadMore();
  }

  setClickButtonHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
