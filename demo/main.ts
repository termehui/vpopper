import { createApp } from "vue";
import App from "./App.vue";
import vPopper from "../src/index";

createApp(App)
    .use(vPopper)
    .mount("#app");
