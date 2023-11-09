import { LitComponent } from "./LitComponent";

export abstract class LazyLitComponent extends LitComponent {
  protected performUpdate(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.prepareTemplate().then((template) =>
          requestAnimationFrame(() => {
            this.renderTemplate(template);
            resolve();
          }),
        ).catch(reject);
      });
    });
  }
}
