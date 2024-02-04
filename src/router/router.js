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
  const isAuthenticated = await checkSession();

  // If the user is already authenticated and is trying to access the login page,
  // redirect them to the home page or another authenticated route
  if (isAuthenticated && to.path === "/login") {
    next("/");
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if the route requires authentication and the user is not authenticated
    next("/login");
  } else {
    // Allow access to other routes
    next();
  }
});

export default router;
