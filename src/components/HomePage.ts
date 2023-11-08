import { TemplateResult, html } from "lit-html";
import { LitComponent } from "./LitComponent";

export class HomePage extends LitComponent {
  constructor() {
    super();
    this.state = {
      demo: false,
    };
  }

  protected template(): TemplateResult | Promise<TemplateResult> {
    return html`<p>
        <label>
          <input
            type="checkbox"
            value="demo"
            @change=${this.onChange.bind(this)}
          />
          Demo
        </label>
      </p>
      ${this.state.demo ? this.demoPage() : this.appPage()}`;
  }

  private onChange(e: any) {
    e.preventDefault();
    this.state = {
      demo: e.target.checked,
    };
  }

  private demoPage() {
    return html`<header>
        <h1>Lazy Loading Demo</h1>
      </header>
      <main>
        <space-words></space-words>
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
