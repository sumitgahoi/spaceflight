import { Articles } from "./components/Articles";
import { Button } from "./components/Button";
import { HomePage } from "./components/HomePage";
import { SearchFormComponent } from "./components/SearchFormComponent";
import { Spinner } from "./components/Spinner";
import { Word } from "./demo/Word";
import { Words } from "./demo/Words";

customElements.define("space-articles", Articles);
customElements.define("space-spinner", Spinner);
customElements.define("space-word", Word);
customElements.define("space-words", Words);
customElements.define("space-searchform", SearchFormComponent);
customElements.define("space-button", Button);
customElements.define("space-home", HomePage);
