import { html } from "lit-html";
import { LitComponent } from "./LitComponent";

export class Articles extends LitComponent {
  constructor() {
    super();
    this.state = { loading: false, results: [] };
  }

  protected async componentDidMount(): Promise<void> {
    const url =
      "https://api.spaceflightnewsapi.net/v4/articles/?format=json&offset=0&limit=1";
    await this.fetchData(url);
  }

  private async fetchNextBatch() {
    const url = this.state.next;
    await this.fetchData(url);
  }

  private async fetchPrevBatch() {
    const url = this.state.previous;
    await this.fetchData(url);
  }

  private async search(payload: {
    search: string;
    sites: string;
    limit: number;
  }) {
    const { search, sites, limit } = payload;

    let args = "format=json&offset=0";
    if (search) {
      args += `&search=${search}`;
    }
    if (sites && sites !== "ALL") {
      args += `&news_site=${sites}`;
    }
    if (limit) {
      args += `&limit=${limit}`;
    }

    const url = `https://api.spaceflightnewsapi.net/v4/articles/?${args}`;
    await this.fetchData(url);
  }

  private async fetchData(url: string) {
    this.state = {
      ...this.state,
      loading: true,
    };
    const response = await fetch(url);
    const res = await response.json();
    this.state = {
      ...res,
      loading: false,
    };
  }

  protected template() {
    return html`
      <style>
        @import "https://cdn.simplecss.org/simple.min.css";
      </style>
      <h2>Articles</h2>

      <space-searchform
        .props=${{ onsubmit: this.search.bind(this) }}
      ></space-searchform>

      ${this.state.loading
        ? html` <space-spinner></space-spinner>`
        : html` ${this.getTable()} ${this.getPrevBtn()} ${this.getNextBtn()} `}
    `;
  }

  private getTable() {
    return html`<table>
      ${this.getHeader()}
      ${this.state.results.map((article: any) => this.getArticleRow(article))}
    </table>`;
  }

  private getHeader() {
    return html`<tr>
      <th>Id</th>
      <th>Title</th>
      <th>Image</th>
      <th>Summary</th>
    </tr>`;
  }

  private getNextBtn() {
    const props = {
      label: "Next",
      onClick: this.fetchNextBatch.bind(this),
      disabled: !this.state.next,
    };
    return html`<space-button .props=${props}></space-button>`;
  }

  private getPrevBtn() {
    const props = {
      label: "Prev",
      onClick: this.fetchPrevBatch.bind(this),
      disabled: !this.state.previous,
    };
    return html`<space-button .props=${props}></space-button>`;
  }

  private getArticleRow(article: any) {
    return html`
      <tr>
        <td>${article.id}</td>
        <td>${article.title}</td>
        <td><img src=${article.image_url} /></td>
        <td>${article.summary}</td>
      </tr>
    `;
  }
}
