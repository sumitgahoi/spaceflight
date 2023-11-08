import { TemplateResult, html } from "lit-html";
import { LitComponent } from "../components/LitComponent";
import { sleep } from "../utils";

export class Word extends LitComponent {
  protected async template() {
    await sleep(this.props.index * 100);
    return new Promise<TemplateResult>((res) => {
      res(html`${this.props.word + " "}`);
    });
  }
}
