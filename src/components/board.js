import AbstractComponent from "./abstract-component";

const addBoardBlock = () => {
  return `<section class="board container">
        </section>`;
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return addBoardBlock();
  }
}
