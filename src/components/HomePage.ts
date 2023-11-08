import { TemplateResult, html } from "lit-html";
import { LitComponent } from "./LitComponent";

export class HomePage extends LitComponent {
  constructor() {
    super();
    this.state = {
      demo: false,
      lazy: false,
    };
  }

  protected template(): TemplateResult | Promise<TemplateResult> {
    return html`<p>
        <label>
          <input
            type="checkbox"
            value="demo"
            @change=${this.onDemoSelectionChange.bind(this)}
          />
          Demo
        </label>
        <label>
          <input
            type="checkbox"
            value="lazy"
            @change=${this.onLazySelection.bind(this)}
          />
          Lazy
        </label>
      </p>
      ${this.state.demo ? this.demoPage() : this.appPage()}`;
  }

  private onDemoSelectionChange(e: any) {
    e.preventDefault();
    this.state = {
      ...this.state,
      demo: e.target.checked,
    };
  }

  private onLazySelection(e: any) {
    e.preventDefault();
    this.state = {
      ...this.state,
      lazy: e.target.checked,
    };
  }

  private demoPage() {
    const longText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    const words = longText.split(" ");
    const props = { words, index: 0 };

    return html`<header>
        <h1>Lazy Loading Demo</h1>
      </header>
      <main>
        ${this.state.lazy
          ? html`<space-lazy-word .props=${props}></space-lazy-word>`
          : html`<space-word .props=${props}></space-word>`}
      </main>`;
  }

  private appPage() {
    return html`<header>
        <h1>Space flight news API</h1>
        <p>A showcase of space flight news api using lit-html and simple css</p>
      </header>
      <main>
        <space-articles></space-articles>
      </main>`;
  }
}
