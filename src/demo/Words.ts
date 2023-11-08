import { html } from "lit-html";
import { LitComponent } from "../components/LitComponent";

export class Words extends LitComponent {
  private readonly longText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  protected async template() {
    return html`${this.longText.split(" ").map((word, index) => {
      const props = {
        index,
        word,
      };
      return html`<space-word .props=${props}></space-word>`;
    })}`;
  }
}
