import { TemplateResult, html } from "lit-html";
import { LitComponent } from "./LitComponent";

export class SearchFormComponent extends LitComponent {
  protected async template(): Promise<TemplateResult> {
    return html` <style>
        @import "https://cdn.simplecss.org/simple.min.css";
      </style>
      <form action="#" @submit=${this.handleSubmit.bind(this)}>
        <p>${this.getSearchInput()}</p>
        <p>${await this.getNewsSiteDropdown()}</p>
        <p>${this.getPageSizeDropdown()}</p>
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" />
      </form>`;
  }

  private getSearchInput(): TemplateResult | Promise<TemplateResult> {
    return html` <label for="search">Search</label>
      <input name="search" placeholder="Search specific phrase" />`;
  }

  private async getNewsSiteDropdown() {
    const url = "https://api.spaceflightnewsapi.net/v4/info/?format=json";
    const response = await fetch(url);
    const { news_sites } = await response.json();
    news_sites.unshift("ALL");
    return html`
      <label for="sites">Choose a news site:</label>
      <select name="sites" multiple>
        ${news_sites.map(
          (site: string) => html`<option value="${site}">${site}</option>`,
        )}
      </select>
    `;
  }

  private getPageSizeDropdown() {
    return html`
      <label for="limit">Limit:</label>
      <select name="limit">
        ${[1, 2, 5, 10, 25, 50].map(
          (limit: number) => html`<option value="${limit}">${limit}</option>`,
        )}
      </select>
    `;
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const map = new Map();
    for (const pair of formData.entries()) {
      const [key, value] = pair;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(value);
    }

    const formProps: any = {};
    map.forEach((value, key) => {
      formProps[key] = value.join(",");
    });
    this.props.onsubmit(formProps);
  }
}
