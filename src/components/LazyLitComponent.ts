import { LitComponent } from "./LitComponent";

export abstract class LazyLitComponent extends LitComponent {
    protected async performUpdate(): Promise<void> {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.prepareTemplate().then((template) =>
              requestAnimationFrame(() => {
                this.renderTemplate(template);
                resolve();
              })
            );
          });
        });
      }
}