import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/home.vue";
import Login from "../view/login.vue";
import { checkSession } from "../auth/auth";

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      requiresAuth: true, // This route requires authentication
    },
  },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Check the user's session
    const isAuthenticated = await checkSession();

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else {
    // Allow access to routes that do not require authentication
    next();
  }
});

export default router;
