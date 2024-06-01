import "./assets/main.css";
import { firebaseApp } from "./firebaseConfig";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { useCurrentUser, getCurrentUser } from "vuefire";
import { VueFire, VueFireFirestoreOptionsAPI, VueFireAuth } from "vuefire";

const app = createApp(App);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireFirestoreOptionsAPI(), VueFireAuth()],
});

const user = getCurrentUser();
if (user) {
  console.log("User is logged in");
  console.log(user);
  console.log(user);
} else {
  console.log("User is not logged in");
}
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});

app.use(router);

app.mount("#app");
