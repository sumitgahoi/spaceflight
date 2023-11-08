import { html } from "lit-html";
import { LazyLitComponent } from "../components/LazyLitComponent";

export class LazyWord extends LazyLitComponent {
  protected async template() {
    for (let i = 0; i < 50000000; i++) {
      // mock slowness
    }
    const { words, index } = this.props;

    if (index < words.length) {
      const props = { words, index: index + 1 };
      const word = words[index];
      return html`${word + " "}<space-lazy-word
          .props=${props}
        ></space-lazy-word>`;
    } else {
      return html``;
    }
  }
}
