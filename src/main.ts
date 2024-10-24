import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "./style.css";
import App from "./App.vue";
import DatePicker from "primevue/datepicker";

import router from "./router";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.component("DatePicker", DatePicker);
app.use(router);
app.mount("#app");
