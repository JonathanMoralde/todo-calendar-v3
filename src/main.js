import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router"; // Import the router file
import "./index.css";

const app = createApp(App);
app.use(router); // Use the router

app.mount("#app");
