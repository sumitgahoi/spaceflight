import { html, render } from "lit-html";
import "./registry";
import "./styles.css";

const demo = false;

if (demo) {
  render(
    html`<header>
        <h1>Lazy Loading Demo</h1>
      </header>
      <main>
        <space-words></space-words>
      </main>`,
    document.body,
  );
} else {
  render(
    html`<header>
        <h1>Space flight news API</h1>
        <p>A showcase of space flight news api using lit-html and simple css</p>
      </header>
      <main>
        <space-articles></space-articles>
      </main>`,
    document.body,
  );
}
