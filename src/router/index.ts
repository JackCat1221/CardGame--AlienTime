import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import CardGame from "@/views/CardGame.vue";
import AlienTime from "@/views/AlienTime.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/card-game", component: CardGame },
  { path: "/alien-time", component: AlienTime },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
