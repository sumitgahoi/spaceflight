import { html } from "lit-html";
import { LitComponent } from "./LitComponent";

export class Button extends LitComponent {
  constructor() {
    super();
    this.state = {
      inProgress: false,
    };
  }

  protected createRenderRoot(): HTMLElement | ShadowRoot {
    return this;
  }

  private async onClick() {
    this.state = {
      inProgress: true,
    };
    await this.props.onClick();
    this.state = {
      inProgress: false,
    };
  }

  protected template() {
    const { disabled, label } = this.props;
    const { inProgress } = this.state;
    return html`
      <button
        ?disabled="${disabled || inProgress}"
        @click="${this.onClick.bind(this)}"
      >
        ${label}
      </button>
    `;
  }
}
