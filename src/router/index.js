import { createRouter, createWebHistory } from "vue-router";

import welcomePageView from "@/views/WelcomePage/welcomeViews.vue";
import loginView from "@/views/AuthViews/loginView.vue";
import signupView from "@/views/AuthViews/signupView.vue";
import profileView from "@/views/ProfileView/profileView.vue";
import projectView from "@/views/ProjectsView/projectsView.vue";
import createProjectView from "@/views/ProjectsView/createProjectView.vue";
import eventsView from "@/views/EventsViews/eventsView.vue";
import aboutView from "@/views/AboutView/aboutView.vue";
import galleryView from "@/views/GalleryView/galleryView.vue";
import joinProjectView from "@/views/ProjectsView/joinProjectView.vue";
import singleProjectView from "@/views/ProjectsView/projectView.vue";
import JoinRequests from "@/views/ProjectsView/joinRequests.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: welcomePageView,
    },

    {
      path: "/login",
      name: "login",
      component: loginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: signupView,
    },
    {
      path: "/profile",
      name: "profile",
      component: profileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/projects",
      name: "projects",
      component: projectView,
      meta: { requiresAuth: true },
    },
    {
      path: "/createProject",
      name: "createProject",
      component: createProjectView,
      meta: { requiresAuth: true },
    },
    {
      path: "/events",
      name: "events",
      component: eventsView,
      //meta: {requiresAuth:true}
    },
    {
      path: "/about",
      name: "about",
      component: aboutView,
      meta: { requiresAuth: true },
    },
    {
      path: "/gallery",
      name: "gallery",
      component: galleryView,
      meta: { requiresAuth: true },
    },
    {
      path: "/join/:projectId",
      name: "join",
      component: joinProjectView,
      meta: { requiresAuth: true },
    },
    {
      path: "/project/:projectId",
      name: "project",
      component: singleProjectView,
      meta: { requiresAuth: true },
    },
    {
      path: "/joinRequests/:projectId",
      name: "joinRequests",
      component: JoinRequests,
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
