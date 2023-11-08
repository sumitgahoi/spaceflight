import { html } from "lit-html";
import { LitComponent } from "../components/LitComponent";

export class Word extends LitComponent {
  protected async template() {
    for (let i = 0; i < 50000000; i++) {
      // mock slowness
    }
    const { words, index } = this.props;

    if (index < words.length) {
      const props = { words, index: index + 1 };
      const word = words[index];
      return html`${word + " "}<space-word .props=${props}></space-word>`;
    } else {
      return html``;
    }
  }
}
