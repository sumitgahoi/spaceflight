import { TemplateResult, render } from "lit-html";

export abstract class LitComponent<P = any, S = any> extends HTMLElement {
  private readonly renderRoot: HTMLElement | DocumentFragment;
  private _props: P = {} as P;
  private _state: S = {} as S;

  private updateComplete: Promise<void> | null = null;

  constructor() {
    super();
    this.renderRoot = this.createRenderRoot();
  }

  /**
   * Return the node where the template should render.
   * Default behavior is to create and return a shadowRoot.
   * Override this method to return `this` to render the template as this element's childNodes.
   */
  protected createRenderRoot(): HTMLElement | ShadowRoot {
    return this.attachShadow({ mode: "open" });
  }

  get props() {
    return this._props;
  }

  set props(newProps: P) {
    this._props = newProps;
    this.requestUpdate();
  }

  get state() {
    return this._state;
  }

  set state(newState: S) {
    this._state = newState;
    this.requestUpdate();
  }

  async connectedCallback() {
    this.upgradeProps();
    await this.requestUpdate();
    await Promise.resolve(this.componentDidMount());
  }

  /** See https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties */
  private upgradeProps() {
    const value = this._props;
    delete this._props;
    this._props = value;
  }

  disconnectedCallback() {
    this.componentDidUnmount();
  }

  protected componentDidMount() {
    // empty
  }

  protected componentDidUnmount() {
    // empty
  }

  protected abstract template(): Promise<TemplateResult> | TemplateResult;

  protected async prepareTemplate(): Promise<unknown> {
    return this.template();
  }

  protected renderTemplate(template: unknown) {
    // requestAnimationFrame(() => render(template, this.renderRoot));
    render(template, this.renderRoot);
  }

  /**
   * Request a UI update. Returns a promise which is resolved when the update completes.
   * Multiple calls to this method in a single execution frame only results in one update.
   */
  requestUpdate(): Promise<void> {
    if (this.updateComplete === null) {
      this.updateComplete = Promise.resolve()
        .then(() => (this.updateComplete = null))
        .then(() => this.performUpdate());
    }

    return this.updateComplete;
  }

  protected async performUpdate(): Promise<void> {
    const template = await this.prepareTemplate();
    this.renderTemplate(template);
  }
}
